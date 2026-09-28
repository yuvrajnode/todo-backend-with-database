# Todo Backend with Database

A small REST API where users sign up, log in, and manage their own todos. Node.js, Express 5, MongoDB (Mongoose), bcrypt and JWT, with Zod validating sign-up input.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

## Features

- Sign up and sign in, with passwords hashed by bcrypt
- JWT auth through a `token` request header
- Create, list, update and delete todos, scoped to the signed-in user
- Mongoose schemas for users and todos

## Getting started

**Prerequisites:** Node.js 20.6+ (for `--env-file`) and a MongoDB database.

```bash
git clone https://github.com/yuvrajnode/todo-backend-with-database.git
cd todo-backend-with-database
npm install
cp .env.example .env   # then fill in your own values
npm start
```

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign tokens |
| `PORT` | Port to listen on (default `3000`) |

## API

| Method | Route | Auth | Body | Response |
|---|---|---|---|---|
| POST | `/signup` | – | `{ email, password, name }` | `{ message }` |
| POST | `/signin` | – | `{ email, password }` | `{ token }` |
| POST | `/todo` | `token` header | `{ title }` | `{ message }` |
| POST | `/todos` | `token` header | – | `{ todos: [...] }` |
| PUT | `/todo/:id` | `token` header | `{ done }` | `{ message }` |
| DELETE | `/todo/:id` | `token` header | – | `{ message }` |

```bash
TOKEN=$(curl -s -X POST localhost:3000/signin -H "Content-Type: application/json" \
  -d '{"email":"me@example.com","password":"secret"}' | jq -r .token)

curl -X POST localhost:3000/todo -H "token: $TOKEN" -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js"}'
```

## Project structure

```text
├── index.js      # Routes, auth middleware, server
├── db.js         # User and Todo schemas
└── .env.example  # Required environment variables
```

## License

MIT © Yuvraj Singh
