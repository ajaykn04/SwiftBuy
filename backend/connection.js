var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://test:test@cluster0.cguda.mongodb.net/new1?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected!");
}).catch((error) => {
    console.log(error)
})