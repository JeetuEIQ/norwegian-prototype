const { signupController, LoginController, verifyToken } = require("../controller/SignupLoginController");
const { auth } = require("../middleware/middle");

const LoginSignupRouter = require("express").Router()



LoginSignupRouter.post("/api/v1/signup",signupController);
LoginSignupRouter.post("/api/v1/login",LoginController);
LoginSignupRouter.post("/api/v1/verify-token",auth,verifyToken);


module.exports  = {LoginSignupRouter}