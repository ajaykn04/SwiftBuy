var mongoose = require("mongoose");


const reviewSchema = mongoose.Schema({
    userId: String,
    username: String,
    rating: Number,
    comment: String
});

var productSchema = mongoose.Schema({
    merchant_id: String,
    merchant_name: String,
    name: String,
    description: String,
    price: Number,
    stock: Number,
    category: String,
    keywords: [String],
    image: String,
    featured: Boolean,
    rating: Number,
    reviews: [reviewSchema]
})

var productModel = mongoose.model("product", productSchema);

module.exports = productModel;