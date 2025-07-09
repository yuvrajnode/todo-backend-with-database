const bcrypt = require('bcrypt');
const express = require('express');
const { UserModel, TodoModel } = require('./db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Yuvrajbackend';
const mongoose = require('mongoose');
const { z } = require('zod');

mongoose.connect("mongodb+srv://Yuvraj:ouXBDIPxS5qTWPhf@clusteryuvi.zzixubw.mongodb.net/");

const app = express();
app.use(express.json());

// Signup Route
app.post("/signup", async function(req, res) {
    try {
        const requiredBody = z.object({
            email: z.string().email(),
            password: z.string(),
            name: z.string()
        });

        const parsedData = requiredBody.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(404).json({ message: "Incorrect format" });
        }

        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            email,
            password: hashedPassword,
            name
        });

        res.json({ message: "You are signed up" });
    } catch (e) {
        res.status(500).json({ message: "Error while signing up" });
    }
});

// Signin Route
app.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

// Middleware
function auth(req, res, next) {
    try {
        const token = req.headers.token;
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.userId = decodedData.id;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
}

// Create Todo
app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const { title } = req.body;

    await TodoModel.create({ title, userId });

    res.json({ message: "Todo created" });
});

// Get All Todos
app.post("/todos", auth, async function(req, res) {
    const userId = req.userId;
    const todos = await TodoModel.find({ userId });

    res.json({ todos });
});

// Update Todo (e.g. mark as done)
app.put("/todo/:id", auth, async function(req, res) {
    const todoId = req.params.id;
    const { done } = req.body;

    await TodoModel.updateOne({ _id: todoId }, { done });

    res.json({ message: "Todo updated" });
});

// Delete Todo
app.delete("/todo/:id", auth, async function(req, res) {
    const todoId = req.params.id;

    await TodoModel.deleteOne({ _id: todoId });

    res.json({ message: "Todo deleted" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});