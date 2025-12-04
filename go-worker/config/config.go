package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	RabbitMQURL  string
	QueueName    string
	ConsumerName string
}

func LoadConfig() *Config {
	godotenv.Load()

	cfg := &Config{
		RabbitMQURL:  os.Getenv("RMQ_URL"),
		QueueName:    os.Getenv("RMQ_QUEUE"),
		ConsumerName: os.Getenv("RMQ_CONSUMER"),
	}

	return cfg
}
