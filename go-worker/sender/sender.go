package sender

import (
	"fmt"
	"net/http"
	"slices"
	"strings"
)

type Sender struct {
	cfg    Config
	Client *http.Client
}

func NewSender() *Sender {
	cfg := LoadConfig()

	return &Sender{cfg: cfg, Client: &http.Client{}}
}

func (s *Sender) SendToAPI(msg string) error {
	req, err := http.NewRequest(
		http.MethodPost,
		s.cfg.APIURL,
		strings.NewReader(msg),
	)

	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("x-api-key", s.cfg.APIKEY)

	res, err := s.Client.Do(req)

	if err != nil {
		return err
	}

	if !slices.Contains([]int{200, 201}, res.StatusCode) {
		return fmt.Errorf("a API respondeu com erro %v", res.StatusCode)
	}

	defer res.Body.Close()

	return nil
}
