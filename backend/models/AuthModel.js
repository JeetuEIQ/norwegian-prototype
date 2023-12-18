const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
    email:{type:String,unique:true},
    username:{type:String},
    password:{type:String}
})

const signup = mongoose.model("signup",signupSchema);
module.exports = {signup};