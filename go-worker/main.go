package main

import (
	"fmt"

	"github.com/vinyresende/go-worker/config"
	"github.com/vinyresende/go-worker/rabbitmq"
	"github.com/vinyresende/go-worker/sender"
)

func main() {
	cfg := config.LoadConfig()
	forever := make(chan bool)

	sender := sender.NewSender()
	consumer := rabbitmq.NewConsumer(cfg, *sender)

	go func() {
		err := consumer.Start()

		if err != nil {
			fmt.Printf("Error: %v", err)
		}
	}()

	<-forever
}
