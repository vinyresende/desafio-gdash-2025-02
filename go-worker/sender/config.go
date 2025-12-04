package sender

import "os"

type Config struct {
	APIURL string
	APIKEY string
}

func LoadConfig() Config {
	return Config{
		APIURL: os.Getenv("API_URL"),
		APIKEY: os.Getenv("API_KEY"),
	}
}
