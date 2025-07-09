# 🧠 Auth Todo API

A simple RESTful backend API built with **Node.js**, **Express**, **MongoDB**, and **JWT** that allows users to register, log in, and manage their personal todo tasks.

---

## 🚀 Features

- ✅ User Signup and Login  
- 🔐 JWT-based Authentication using custom `token` header  
- 📝 Create, fetch, update, and delete todos  
- 🗃️ MongoDB with Mongoose schemas & models  
- 📦 Clean JSON-based REST API  

---

## 📁 Project Structure

```
├── index.js         # Main server file (routes, middleware, logic)
├── db.js            # MongoDB schemas and models
├── package.json     # Project metadata and dependencies
├── .gitignore       # Files to ignore in version control
```

---

## 🛠️ Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB** with **Mongoose**  
- **JWT** for authentication  
- **bcrypt** for password hashing  
- **zod** for request validation  

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

**Response:**
```json
{
  "message": "You are signed up"
}
```

---

### 🔹 POST `/signin`  
Authenticates the user and returns a JWT token.

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

### 🔹 POST `/todo`  
Creates a new todo.

**Headers:**
```
token: JWT_TOKEN_HERE
```

**Request Body:**
```json
{
  "title": "Learn Node.js"
}
```

**Response:**
```json
{
  "message": "Todo created"
}
```

---

### 🔹 POST `/todos`  
Fetches all todos of the authenticated user.

**Headers:**
```
token: JWT_TOKEN_HERE
```

**Response:**
```json
{
  "todos": [
    {
      "_id": "todoId",
      "title": "Learn Node.js",
      "done": false,
      "userId": "userId"
    }
  ]
}
```

---

### 🔹 PUT `/todo/:id`  
Updates a todo (e.g., mark as done).

**Headers:**
```
token: JWT_TOKEN_HERE
```

**Request Body:**
```json
{
  "done": true
}
```

**Response:**
```json
{
  "message": "Todo updated"
}
```

---

### 🔹 DELETE `/todo/:id`  
Deletes a todo.

**Headers:**
```
token: JWT_TOKEN_HERE
```

**Response:**
```json
{
  "message": "Todo deleted"
}
```

---

## ⚙️ Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/yuvrajnode/todo-backend-with-database.git
cd todo-backend-with-database
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure MongoDB URI and secret (optional):**  
If using environment variables, create a `.env` file and add:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
```
(Or keep them hardcoded in `index.js` as done currently.)

4. **Start the server:**
```bash
node index.js
```

Server will run at:  
📍 `http://localhost:3000`

---

## 🙋‍♂️ Author

Made with ❤️ by **Yuvraj Singh**  
GitHub: [@yuvrajnode](https://github.com/yuvrajnode)

---

## 📜 License

This project is open source and free to use under the [MIT License](LICENSE).
