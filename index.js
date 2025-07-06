const express = require ('express');
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Yuvrajbackend";
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Yuvraj:ouXBDIPxS5qTWPhf@clusteryuvi.zzixubw.mongodb.net/")
const app = express();
app.use(express.json());

app.post("/signup", async function (req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
    // await is necessary as to check if it a successful call or a fake call 
    await UserModel.create({
        email : email,
        password : password,
        name : name 
    })
    res.json({
        message : "You are loged in!!"
    })
});

app.post("/signin", async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email : email,
        password : password
    })

    console.log(user);

    if(user){
        const token = jwt.sign({
            id : user._id.toString()
        }, JWT_SECRET);
        res.json({
            token : token
        })
    } else {
        res.status(403).json({
            message : "Incorrect credentials"
        })
    }
});

app.post("/todo", auth, function(req,res){
    const userId = req.userId;
    const title = req.body.title;

    TodoModel.create({
        title,
        userId
    })

    res.json({
        userId : req.userId
    });
});

app.post("/todos", auth, async function(req,res){
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId : userId
    })

    res.json({
        todos : todos
    });
});

function auth (req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token , JWT_SECRET)

    if(decodedData){
        req.userId = decodedData.id;
        next();
    } else {
        res.json({
            message : "Incorrect credentials. Check again!!!"
        })
    }
}

app.listen(3000);