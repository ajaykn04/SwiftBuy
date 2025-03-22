var mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: "product"},
    quantity: Number
});

const wishlistSchema = mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: "product"}
});

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    place: String,
    age: Number,
    password: String,
    role: String,
    cart: [cartSchema],
    wishlist: [wishlistSchema]
})

var userModel = mongoose.model("user", userSchema);

module.exports = userModel;