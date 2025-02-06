var express = require("express");
var cors = require("cors");
var path = require('path');
var multer = require("multer");
var crypto = require('crypto')
var app = express();
var fs = require("fs");
require("./connection.js");

const URL = "http://localhost";
const PORT = 3000;

var CryptoJS = require('crypto-js');
var userModel = require("./models/user");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/recipes/');
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomBytes(8).toString('hex').slice(0, 8) + path.extname(file.originalname));
    },
});
const upload = multer({storage: storage});


app.use(express.json());
app.use(cors());


app.get("/user/viewall", async (req, res) => {
    try {
        var data = await userModel.find();
        res.send(data)

    } catch (error) {
        console.log(error);
    }
});


app.post("/user/add", async (req, res) => {
    try {
        await userModel(req.body).save();
        res.send({message: "Data Added"});
    } catch (error) {
        console.log(error);
    }
});


app.get("/user/get/:email/:password", async (req, res) => {
    try {
        var email = req.params.email;
        var password = CryptoJS.SHA256(req.params.password).toString(CryptoJS.enc.Hex)
        var user = await userModel.findOne({email: email, password: password});
        if (user) {
            res.send(user);
        } else {
            res.status(404);
            res.send({message: "Invalid Email or Password"});
        }

    } catch (error) {
        console.log(error);
    }
});

app.post("/user/register/", async (req, res) => {
    try {
        var user = req.body;
        user.role = "user";
        user.password = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex)
        var existing_user = await userModel.findOne({email: user.email});
        if (!existing_user) {

            await userModel(user).save();
            res.send({message: "Account Registered"});

        } else {
            res.status(409);
            res.send({message: "Email Already Exists"});
        }

    } catch (error) {
        console.log(error);
    }
});

app.put("/user/edit/", async (req, res) => {
    try {
        var id = req.body._id;
        var user = req.body;
        var existing_user = await userModel.findOne({email: user.email});
        if (!existing_user) {
            await userModel.findByIdAndUpdate(id, user);
            res.send({message: "Profile Updated"})
        } else if (existing_user._id == user._id) {
            await userModel.findByIdAndUpdate(id, user);
            res.send({message: "Profile Updated"})
        } else {
            res.status(409);
            res.send({message: "Email Already Exists."})
        }

    } catch (error) {
        console.log(error);
    }
})


app.delete("/user/delete/", async (req, res) => {
    try {
        var id = req.body._id;
        var del = await userModel.findByIdAndDelete(id);
        if (del != null) {
            var delrecipes = await recipeModel.find({owner: id})
            await recipeModel.deleteMany({owner: id});
            for (let i = 0; i < delrecipes.length; i++) {
                fs.unlink(delrecipes[i].image, () => {
                });
            }
            res.send({message: "Account Deleted"});
        } else {
            res.status(404);
            res.send({message: "Failed To Delete Account"});
        }

    } catch (error) {
        res.status(404);
        res.send({message: "Failed To Delete Account"});
    }
})


app.listen(PORT, () => {
    console.log("Port is Up");
});