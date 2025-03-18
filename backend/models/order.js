var mongoose = require("mongoose");
var orderSchema = mongoose.Schema({
    name: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    amount: Number,
    quantity: Number,
    status: String,
    image: String,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    placedAt: { type: Date, default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000) }
})

var orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;