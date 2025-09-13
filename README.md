# Jornaleiro Bot

Um bot para telegram que te mostra as principais noticias do dia, todo dia!

## Motivação

Criei este projeto como uma forma de evoluir minhas habilidades, explorar novas ferramentas e, principalmente, colocar em prática todo o conhecimento que venho adquirindo usando Hono, Drizzle ORM e Bun.

O objetivo principal do bot é facilitar meu acesso às informações que realmente importam, reunindo as principais notícias do dia de forma prática. Sempre quis me manter atualizado, mas achava extremamente tedioso buscar manualmente o que estava acontecendo no mundo.

Com este projeto, consigo unir aprendizado e utilidade, criando algo que me ajuda no dia a dia enquanto me desafia a melhorar como desenvolvedor. É a combinação perfeita entre estudo e prática real.

## Instalação

1.  Clone o repositório:

    ```sh
    git clone https://github.com/raphaeleliass/jornaleiro_bot.git
    ```

2.  Instale as dependências:

    ```sh
    npm install
    # ou
    pnpm install
    # ou
    yarn install
    # ou
    bun install
    ```

## Configuração

1.  Crie um arquivo `.env` copiando o arquivo `.env.example`:

    ```sh
    cp .env.example .env
    ```

2.  Edite o arquivo `.env` e adicione o token do seu bot do Telegram:

    ```
    TELEGRAM_TOKEN=seu-token-do-bot-do-telegram
    ```

## Executando a aplicação

```sh
npm run dev
# ou
pnpm dev
# ou
yarn dev
# ou
bun run dev
```

A aplicação estará disponível em `http://localhost:3000`.
