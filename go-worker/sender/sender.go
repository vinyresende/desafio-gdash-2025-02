package sender

import (
	"net/http"
	"strings"
)

type Sender struct {
	cfg Config
}

func NewSender() *Sender {
	cfg := LoadConfig()

	return &Sender{cfg: cfg}
}

func (s *Sender) SendToAPI(msg string) error {
	res, err := http.Post(
		s.cfg.APIURL,
		"application/json",
		strings.NewReader(msg),
	)

	if err != nil {
		return err
	}

	defer res.Body.Close()

	return nil
}
