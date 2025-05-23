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
var orderModel = require("./models/order")
var miscModel = require("./models/misc")

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
        user.cart = [];
        user.wishlist = [];
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
        fs.rename(req.file.path, img_path, () => {
        })
        product.image = `${img_path}`;
        product.save();
        res.send({message: "Product Added"})

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
        var data = await productModel.find({merchant_id: id});
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
            fs.unlink(del.image, () => {
            });
            await userModel.updateMany(
                { "cart.product": id },
                { $pull: { cart: { product: id } } }
            );
            await userModel.updateMany(
                { "wishlist.product": id },
                { $pull: { wishlist: { product: id } } }
            );
            res.send({message: "Product Deleted"});
        } else {
            res.status(404);
            res.send({message: "Failed To Delete Product"});
        }

    } catch (error) {
        res.status(404);
        res.send({message: "Failed To Delete Product"});
    }
})

//app.delete("/product/delete/:id", async (req, res) => {
//    try {
//        var id = req.params.id;
//        var del = await productModel.findByIdAndDelete(id);
//        if (del != null) {
//            fs.unlink(del.image, () => {
//            });
//            res.send({message: "Product Deleted"});
//        } else {
//            res.status(404);
//            res.send({message: "Failed To Delete Product"});
//        }
//
//    } catch (error) {
//        res.status(404);
//        res.send({message: "Failed To Delete Product"});
//    }
//})

app.get("/product/search/:word?", async (req, res) => {
    try {
        var word="";
        word = req.params.word;
        var query = word && word.trim() !== "" ? { name: new RegExp(".*" + word + ".*", "i") } : {};
        var data = await productModel.find(query);

        res.send(data)

    } catch (error) {
        console.log(error);
    }
});

// app.get("/product/search/:word", async (req, res) => {
//     try {
//         var word = req.params.word
//         var data = await productModel.find({ name: new RegExp(".*" + word + ".*", "i") })
//         res.send(data)

//     } catch (error) {
//         console.log(error);
//     }
// });

app.post("/product/addreview/:productId", async (req, res) => {
    try {
        var id = req.params.productId;
        var review = req.body;
        var product = await productModel.findById(id);
        product.reviews.unshift(review)
        let total = 0
        for (let i=0;i<product.reviews.length;i++){
            total += product.reviews[i].rating;
        }
        product.rating = total / product.reviews.length;
        await product.save();
        res.send({ message: "Review Added" })

    } catch (error) {
        console.log(error);
    }
});

app.delete("/product/delreview/:productId/:userId", async (req, res) => {
    try {
        var recid = req.params.productId;
        var userid = req.params.userId;
        var product = await productModel.findById(recid);
        product.reviews = product.reviews.filter(review => review.userId != userid)
        let total = 0
        for (let i=0;i<product.reviews.length;i++){
            total += product.reviews[i].rating;
        }
        product.rating = total / product.reviews.length;
        await product.save();
        res.send({ message: "Review Deleted" })

    } catch (error) {
        console.log(error);
    }
});

app.get("/product/getreviews/:productId", async (req, res) => {
    try {
        var id = req.params.productId;
        var product = await productModel.findById(id);
        res.send(product.reviews);

    } catch (error) {
        console.log(error);
    }
});


app.post("/product/addtocart/:userId/:productId", async (req, res) => {
    try {
        var userId = req.params.userId;
        var productId = req.params.productId;
        var user = await userModel.findById(userId);
        var cartItem = user.cart.find(item => item.product == productId);
        if (cartItem == undefined){
            user.cart.unshift({"product": productId, "quantity": 1});
        }
        else{
            cartItem.quantity += 1
        }

        await user.save();
        res.send({ message: "Product Added To Cart" })

    } catch (error) {
        console.log(error);
    }
});
app.get("/user/getcart/:userId", async (req, res) => {
    try {
        var userId = req.params.userId;
        var user = await userModel.findById(userId);
        await user.populate("cart.product")

        res.send(user.cart)

    } catch (error) {
        console.log(error);
    }
});

app.delete("/user/cart/delitem/:userId/:productId", async (req, res) => {
    try {
        var userId = req.params.userId;
        var productId = req.params.productId;
        var user = await userModel.findById(userId);
        user.cart = user.cart.filter(entry => entry.product != productId);
        await user.save();
        res.send({ message: "Product Deleted" })

    } catch (error) {
        console.log(error);
    }
});

app.post("/user/cart/updateitemquantity/:userId/:productId/:quantity", async (req, res) => {
    try {
        var userId = req.params.userId;
        var productId = req.params.productId;
        var quantity = parseInt(req.params.quantity);
        var user = await userModel.findById(userId);
        var item = user.cart.find(entry => entry.product == productId);
        item.quantity = quantity;
        await user.save();
        res.send({ message: "Quantity Updated" })

    } catch (error) {
        console.log(error);
    }
});


app.get("/orders/viewall", async (req, res) => {
    try {
        var data = await orderModel.find();
        res.send(data)

    } catch (error) {
        console.log(error);
    }
});

app.post("/product/buy/:userId/:productId/:quantity", async (req, res) => {
    try {
        var userId = req.params.userId;
        var productId = req.params.productId;
        var productDetails = await productModel.findById(productId)
        var quantity = parseInt(req.params.quantity);
        var user = await userModel.findById(userId);
        var order = {
            "name": productDetails.name,
            "userId": userId,
            "amount": productDetails.price * quantity,
            "quantity": quantity,
            "status": "Processing",
            "image": productDetails.image,
            "product": productId
        }
        if (productDetails.stock < quantity){
            res.send("Requested Quantity Not In Stock")
        }
        else{
            productDetails.stock -= quantity
            await productDetails.save()
            order = await orderModel(order).save()
            res.send({ message: "Product Order Placed" })
        }

    } catch (error) {
        console.log(error);
    }
});


app.post("/user/cartcheckout/:userId", async (req, res) => {
    try {
        var userId = req.params.userId;
        var productId = req.params.productId;
        var productDetails = await productModel.findById(productId)
        var quantity = parseInt(req.params.quantity);
        var user = await userModel.findById(userId);
        var order = {
            "name": productDetails.name,
            "userId": userId,
            "amount": productDetails.price * quantity,
            "quantity": quantity,
            "status": "Processing",
            "image": productDetails.image,
            "product": productId
        }
        if (productDetails.stock < quantity){
            res.send("Requested Quantity Not In Stock")
        }
        else{
            productDetails.stock -= quantity
            await productDetails.save()
            order = await orderModel(order).save()
            res.send({ message: "Product Order Placed" })
        }

    } catch (error) {
        console.log(error);
    }
});

app.get("/user/orders/:userId", async (req, res) => {
    try {
        var userId = req.params.userId
        var data = await orderModel.find({userId: userId})
        res.send(data)

    } catch (error) {
        console.log(error);
    }
});


app.post("/product/makefeatured/:productId", async (req, res) => {
    try {
        var productId = req.params.productId;
        var product = await productModel.findById(productId);
        product.featured = true;
        product.save();

        res.send({ message: "Added Product to Featured" })

    } catch (error) {
        console.log(error);
    }
});

app.post("/product/removefeatured/:productId", async (req, res) => {
    try {
        var productId = req.params.productId;
        var product = await productModel.findById(productId);
        product.featured = false;
        product.save();

        res.send({ message: "Removed Product From Featured" })

    } catch (error) {
        console.log(error);
    }
});


app.get("/product/getfeatured", async (req, res) => {
    try {
        var data = await productModel.find({ featured: true });
        res.send(data)

    } catch (error) {
        console.log(error);
    }
});

app.post("/product/addtowishlist/:userId/:productId", async (req, res) => {
    try {
        var userId = req.params.userId;
        var productId = req.params.productId;
        var user = await userModel.findById(userId);
        var wishlistItem = user.wishlist.find(item => item.product == productId);
        if (wishlistItem == undefined) {
            user.wishlist.unshift({product: productId})
            await user.save();
            res.send({ message: "Product Added To Wishlist" })
        }
        else{
            res.send({ message: "Product Is Already In Wishlist" })
        }

    } catch (error) {
        console.log(error);
    }
});
app.get("/user/getwishlist/:userId", async (req, res) => {
    try {
        var userId = req.params.userId;
        var user = await userModel.findById(userId);
        await user.populate("wishlist.product")

        res.send(user.wishlist)

    } catch (error) {
        console.log(error);
    }
});

app.delete("/user/wishlist/delitem/:userId/:productId", async (req, res) => {
    try {
        var userId = req.params.userId;
        var productId = req.params.productId;
        var user = await userModel.findById(userId);
        user.wishlist = user.wishlist.filter(entry => entry.product != productId);
        await user.save();
        res.send({ message: "Product Removed From Wishlist" })

    } catch (error) {
        console.log(error);
    }
});

app.post("/misc/categories/add/:name", async (req, res) => {
    try {
        var name = req.params.name;
        var misc = await miscModel.findOne();
        if (misc.categories.filter(item => item === name).length == 0){
            misc.categories.push(name);
            await misc.save()
            res.send({message: "Category Added"});
        }
        else {
            res.send({message:"Category Already Exists"})
        }
    } catch (error) {
        console.log(error);
    }
});

app.delete("/misc/categories/delete/:name", async (req, res) => {
    try {
        var name = req.params.name;
        var misc = await miscModel.findOne();
        misc.categories = misc.categories.filter(item => item !== name)
        await misc.save()
        res.send({message: "Category Deleted"})
    } catch (error) {
        console.log(error);
    }
});

app.get("/misc/categories/get", async (req, res) => {
    try {
        res.send((await miscModel.findOne()).categories)
    } catch (error) {
        console.log(error);
    }
});

app.get("/misc", async (req, res) => {
    try {
        res.send(await miscModel.findOne())
    } catch (error) {
        console.log(error);
    }
});

app.use('/images/products', express.static(path.join(__dirname, 'images/products')));

app.listen(PORT, () => {
    console.log("Port is Up");
});