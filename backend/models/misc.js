var mongoose = require("mongoose");
var miscSchema = mongoose.Schema({
    categories: [String]
})

var miscModel = mongoose.model("misc", miscSchema);

module.exports = miscModel;