const router = require("express").Router();
const { generatePrompt } = require("../controller/promptController");
const { auth } = require("../middleware/middle");


router.post("/api/v1/generate",auth,generatePrompt);



module.exports={router}