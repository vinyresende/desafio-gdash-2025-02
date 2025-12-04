package rabbitmq

import (
	"log"
	"time"

	"github.com/streadway/amqp"
	"github.com/vinyresende/go-worker/config"
	"github.com/vinyresende/go-worker/sender"
)

type Consumer struct {
	cfg       *config.Config
	sender    *sender.Sender
	conn      *amqp.Connection
	channel   *amqp.Channel
	done      chan error
	reconnect bool
}

func NewConsumer(cfg *config.Config, sender sender.Sender) *Consumer {
	return &Consumer{
		sender:    &sender,
		cfg:       cfg,
		done:      make(chan error),
		reconnect: true,
	}
}

// Exported

func (c *Consumer) Start() error {
	err := c.connect()

	if err != nil {
		return err
	}

	go c.handleReconnects()

	_, err = c.channel.QueueDeclare(
		c.cfg.QueueName,
		true,
		false,
		false,
		false,
		nil,
	)

	if err != nil {
		return nil
	}

	msgs, err := c.channel.Consume(
		c.cfg.QueueName,
		c.cfg.ConsumerName,
		false,
		false,
		false,
		false,
		nil,
	)

	if err != nil {
		return err
	}

	go c.processMessages(msgs)

	return nil
}

// Unexported

func (c *Consumer) connect() error {
	var err error

	c.conn, err = amqp.Dial(c.cfg.RabbitMQURL)

	if err != nil {
		return err
	}

	c.channel, err = c.conn.Channel()

	if err != nil {
		return err
	}

	return nil
}

func (c *Consumer) handleReconnects() {
	closes := c.conn.NotifyClose(make(chan *amqp.Error, 10))
	for {
		select {
		case err, ok := <-closes:
			if !ok || !c.reconnect {
				log.Println("Parando tentativa de reconexão (shutdown solicitado)")
				c.done <- nil
				return
			}

			if err != nil {
				log.Printf("Conexão com RabbitMQ perdida: %v", err)
			} else {
				log.Println("Conexão com RabbitMQ fechada normalmente")
			}

			if err := c.reconnectWithBackoff(); err != nil {
				log.Printf("Reconexão falhou permanentemente: %v", err)
				c.done <- err
				return
			}

			closes = c.conn.NotifyClose(make(chan *amqp.Error, 10))
		case <-c.done:
			return
		}
	}
}

func (c *Consumer) reconnectWithBackoff() error {
	var err error

	backoff := time.Second
	for {
		err = c.connect()
		if err == nil {
			break
		}

		log.Printf("Falha na reconexão: %v. Tentando novamente em %v...", err, backoff)

		time.Sleep(backoff)
		backoff *= 2
		if backoff > time.Minute {
			backoff = time.Minute
		}
	}

	return err
}

// Processar mensagens
func (c *Consumer) processMessages(msgs <-chan amqp.Delivery) {
	for msg := range msgs {
		err := c.sender.SendToAPI(string(msg.Body))

		if err != nil {
			log.Fatalf("Erro ao enviar mensagem: %v", err)
			continue
		}

		log.Printf("Mensagem enviada à API: %v", string(msg.Body))

		err = msg.Ack(false)

		if err != nil {
			log.Fatalf("Erro ao ack mensagem: %v", err)
		}
	}
}
