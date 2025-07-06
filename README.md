# Auth Todo API

A simple RESTful backend API built with **Node.js**, **Express**, **MongoDB**, and **JWT** that allows users to register, log in, and manage their personal todo tasks.

## 🚀 Features

- ✅ User Signup and Login
- 🔐 JWT-based Authentication
- 📝 Create and fetch todos (per user)
- 🧾 MongoDB with Mongoose models
- 📦 REST API with JSON responses

---

## 📁 Project Structure

```
├── index.js         # Main server file
├── db.js            # MongoDB schemas & models
├── package.json     # Project metadata
├── .gitignore       # Ignored files
```

---

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt (recommended for password hashing)

---

## 🧪 API Endpoints

### 🔹 POST `/signup`

Registers a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "name": "Yuvraj"
}
```

---

### 🔹 POST `/signin`

Authenticates user and returns a token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

### 🔹 POST `/todo` (Auth Required)

Creates a new todo for the logged-in user.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "title": "Learn Node.js"
}
```

---

### 🔹 POST `/todos` (Auth Required)

Fetches all todos for the authenticated user.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "todos": [ ... ]
}
```

---

## ⚙️ Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/your-username/auth-todo-api.git
cd auth-todo-api
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (if using secrets) or configure variables in `index.js`.

4. Start the server:
```bash
node index.js
```

The server will run on `http://localhost:3000`

---
