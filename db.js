const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email: {type : String, unique : true},//cannot put same email twice
    password: String,
    name: String
});
const Todo = new Schema({
    title : String,
    done : Boolean,
    userId : ObjectId
});
//here this mongoose model let me add data in this specific collection 
const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos',Todo);

//From here this file i have to export the data to the main index.js file 
module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
}