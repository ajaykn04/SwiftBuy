var mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: "product"},
    quantity: Number
});

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    place: String,
    age: Number,
    password: String,
    role: String,
    cart: [cartSchema]
})

var userModel = mongoose.model("user", userSchema);

module.exports = userModel;