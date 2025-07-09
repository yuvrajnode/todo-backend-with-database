const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// User Schema
const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});

// Todo Schema
const Todo = new Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    userId: { type: ObjectId, required: true, ref: 'users' }
});

// Mongoose Models
const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

// Exporting
module.exports = {
    UserModel,
    TodoModel
};