## Projeto

Esse projeto foi criado com base na [API Marvel](https://developer.marvel.com/). Utilizando:
</br>
✔ React (v18)</br>
✔ Typescript (v5)</br>
✔ Vite (v4)</br>
✔ Tailwind (v3)</br>
✔ md5 (v2)</br>

## Pré visualização

É possível pré visualizar o projeto clicando [aqui](https://marvel-app-taupe.vercel.app/)

## Alterações necessárias

Para execução do projeto, será necessário criar conta ou fazer login no site [Marvel](https://developer.marvel.com) para obter as chaves de API.

Crie na raiz do projeto o arquivo:

```bash
.env
```

E acrescente as seguintes variáveis de ambiente:

✔ VITE_PUBLIC_KEY</br>
✔ VITE_PRIVATE_KEY</br>

Exemplo:

```bash
VITE_PUBLIC_KEY=SUA_PUBLIC_KEY
VITE_PRIVATE_KEY=SUA_PRIVATE_KEY
```

## Execução

Na pasta do projeto, rode os seguintes comandos no seu terminal para instalar as dependências:

```bash
npm install
```

Para rodar a aplicação utilize o camando:

```bash
npm run dev
```

Para visualizar no navegador, basta acessar a url http://localhost:5173/
