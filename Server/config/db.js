let mongoose = require("mongoose")

function db(){
mongoose.connect("mongodb://127.0.0.1:27017/chatApp").then(()=>{
	console.log("DB connected")
}).catch((err)=>{
	 console.log(err);
})
}
module.exports =db

 
