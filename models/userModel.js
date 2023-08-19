const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{ type:String, required:true},
    fullName:{ type:String, required:false},
    password:{ type:String, required:false},
    education:{ type:String, required:true},
    city:{ type:String, required:true},
    phone:{ type:String, required:true},
})
const userModel = new mongoose.model("userData", userSchema);
module.exports  = { userModel}