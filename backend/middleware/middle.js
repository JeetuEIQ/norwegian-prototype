const jwt = require("jsonwebtoken")
const { failure } = require("../helper/response")


const auth=async(req,res,next)=>{
    try {

        const {token} = req.headers;
        const verifyToken = await jwt.verify(token,process.env.MY_JWT);
        res._id=verifyToken.id;

        next();
        
    } catch (error) {
        return failure(res,400,"Invalid Token")
    }
}

module.exports={auth}