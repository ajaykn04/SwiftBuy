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
var productModel = require("./models/product");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/products');
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
        user.admin = false;
        user.merchant = false;
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
            var delproducts = await productModel.find({owner: id})
            await productModel.deleteMany({owner: id});
            for (let i = 0; i < delproducts.length; i++) {
                fs.unlink(delproducts[i].image, () => {
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


app.post("/product/add/", upload.single('file'), async (req, res) => {
    try {
        var product = req.body;
        product.reviews = [];
        product.rating = 0;
        product.featured = false;
        req.body.image = ""
        req.body.keywords = req.body.keywords.split(",")
        product = await productModel(product).save();
        var img_path = `${req.file.destination}/${product._id}${path.extname(req.file.filename)}`;
        fs.rename(req.file.path, img_path, () => { })
        product.image = `${img_path}`;
        product.save();
        res.send({ message: "Product Added" })

    } catch (error) {
        console.log(error);
    }
});


app.get("/product/viewall", async (req, res) => {
    try {
        var data = await productModel.find();
        res.send(data)

    } catch (error) {
        console.log(error);
    }
});

app.get("/product/view/:pid", async (req, res) => {
    try {
        var id = req.params.pid
        var data = await productModel.findOne({_id: id});
        res.send(data)

    } catch (error) {
        console.log(error);
    }
});

app.get("/merchant/products/:id", async (req, res) => {
    try {
        var id = req.params.id;
        var data = await productModel.find({ merchant_id: id });
        res.send(data)

    } catch (error) {
        console.log(error);
    }
});

app.delete("/product/delete/:id", async (req, res) => {
    try {
        var id = req.params.id;
        var del = await productModel.findByIdAndDelete(id);
        if (del != null) {
            fs.unlink(del.image, ()=> {});
            res.send({ message: "Product Deleted" });
        }
        else {
            res.status(404);
            res.send({ message: "Failed To Delete Product" });
        }

    } catch (error) {
        res.status(404);
        res.send({ message: "Failed To Delete Product" });
    }
})

app.use('/images/products', express.static(path.join(__dirname, 'images/products')));

app.listen(PORT, () => {
    console.log("Port is Up");
});