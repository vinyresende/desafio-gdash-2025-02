# Desafio para o processo seletivo GDASH 2025/02

Repositório de entrega de desafio para o processo seletivo GDASH 2025/02

## Sobre o projeto

O projeto é divido em várias partes diferentes que se comunicam.

* Backend em `NestJS` utilizando banco de dados `MongoDB`, integração com `PokeAPI` e `Gemini`
* Frontend com `Vite` + `React` + `TailwindCSS` + `shadcn/ui`
* Coletor de dados climáticos com Python (comunicação com RabbitMQ)
* Worker em Go que consome dados de fila RabbitMQ e envia para o Backend

## Como rodar o projeto

O projeto foi pensado para rodar com Docker Compose, apenas sendo necessário criar um arquivo `.env` na pasta raiz do projeto como no [`exemplo`](https://github.com/vinyresende/desafio-gdash-2025-02/blob/main/.env.example) e rodar o seguinte comando no terminal:

```console
> docker compose up --build -d
```

### Usuário padrão (Backend/Frontend)

O usuário padrão informado no arquivo `.env` principal do projeto será criado assim que a API em NestJS for iniciada (caso o usuário não exista).

Os campos que definem o usuário padrão no .env são os seguintes.

```ini
BACK_DEFAULT_USER_USERNAME="Admin User"
BACK_DEFAULT_USER_EMAIL="admin@exemplo.com"
BACK_DEFAULT_USER_PASSWORD="12345678"
```

### Como rodar apenas o Data-Collector em Python

Para rodar apenas o Data-Collector é necessário navegar até o diretório do mesmo e criar um arquivo `.env` como no [`exemplo`](https://github.com/vinyresende/desafio-gdash-2025-02/blob/main/data-collector/.env.example).
Após criar o arquivo `.env`, precisará criar um ambiente em python e instalar as dependências com os seguintes comandos:

```sh
> py -3 -m venv .venv

// Se estiver rodando no Windows
> .venv\Scripts\Activate.ps1

// Se estiver rodando em Linux/MacOS
> source .venv/bin/activate

> pip install -r requirements.txt
```

Para rodar o projeto utilize o seguinte comando:

```sh
> python main.py
```

### Como rodar apenas o Go-Worker

Para rodar apenas o GoWorker é necessário navegar até o diretório do mesmo e criar um arquivo `.env` como no [`exemplo`](https://github.com/vinyresende/desafio-gdash-2025-02/blob/main/go-worker/.env.example).
Após criar o arquivo `.env`, precisará instalar as dependências com os seguinte comando:

```sh
> go mod tidy
```

Para rodar o projeto utilize o seguinte comando:

```sh
> go run main.go
```

---

<div align="center">
  <br />
  <strong>Feito com 💜 e muito café ☕</strong>
  <br />
  <strong>por: Vinícius Resende</strong>
</div>