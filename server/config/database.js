const mongoose=require("mongoose")
require("dotenv").config()

exports.connect=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useUnifiedTopology:true,
    })
    .then(()=>{console.log("DB connection successful")})
    .catch((err)=>{
        console.log("Connection issue")
        console.error(err)
        process.exit(1)
    })
}