// let mongoose= require('mongoose')

// let userSchema= mongoose.Schema({
//     userName:{
//         type:String

//     },
//     email:{
//         type:String
//     },
//     passWord:{
//         type:String
//     },
//    role: {
//         type: String,
//         enum: ["user", "admin", "instructor"],
//         default: "user"
//     },
//     // following:[{
//     //         type:mongoose.Schema.Types.ObjectId,
//     //             required:true,
//     //             ref:"User"
//     // }],
//     // followers:[{
//     //         type:mongoose.Schema.Types.ObjectId,
//     //             required:true,
//     //             ref:"User"
//     // }],
//     resetToken: String,
//     resetTokenExpiry: Date,

// })


//    let User=   mongoose.model("User",userSchema)

//    module.exports=User


   // models/User.js

   
const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);