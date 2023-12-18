const mongoose = require("mongoose")


const connect = async()=>{
    await mongoose.connect(`mongodb+srv://chinmoydehingia:${process.env.MONGO_PW}@cluster0.7m70kri.mongodb.net/?retryWrites=true&w=majority`)
    console.log("Database connected")
}

module.exports = {connect}