var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    place: String,
    age: Number,
    password: String,
    role: String
})

var userModel = mongoose.model("user", userSchema);

module.exports = userModel;