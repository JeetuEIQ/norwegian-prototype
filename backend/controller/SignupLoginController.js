const { response } = require("express")
const { success,failure } = require("../helper/response")
const { signup } = require("../models/AuthModel")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
// const {signup} = require("../models/AuthModel")
const signupController=async(req,res)=>{
    try {
        const {email,password,username}=req.body

        const checkUser  =  await signup.find({email:email})
        if(checkUser.length!=0){
            return failure(res,404,"User Already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const userData ={
            email,password:hashedPassword,username
        } 
        const newUser=await signup.create(userData);
        success(res,200,newUser)
    } catch (error) {
        failure(res,200,error.message)
    }
}

const LoginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const checkUser = await signup.findOne({email:email});

        if(!checkUser){
            return failure(res,404,"No user Found")
        }

        const checkPassword = await bcrypt.compare(password,checkUser.password);
        if(!checkPassword){
            return failure(res,401,"Wrong credentials");
        }

        const token = jwt.sign({id:checkUser._id},process.env.MY_JWT);
        const response={
            token:token
        }
        success(res,200,response)

    } catch (error) {
        failure(res,400,error.message)
    }
}

const verifyToken=async(req,res)=>{
    try {
        success(res,200,"Valid Token")
    } catch (error) {
        failure(res,500,error.message)
    }
}


module.exports = {signupController,LoginController,verifyToken}