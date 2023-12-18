const vocabRouter = require("express").Router();

const { wordController, sentenceController, phraseController,getAllWordController, getAllPhrasesController, getAllSentencesController } = require("../controller/VocabController");
const { auth } = require("../middleware/middle");


vocabRouter.post("/api/v1/add-word",auth,wordController);
vocabRouter.post("/api/v1/add-sentence",auth,sentenceController);
vocabRouter.post("/api/v1/add-phrase",auth,phraseController);
vocabRouter.get("/api/v1/get-words",auth,getAllWordController);
vocabRouter.get("/api/v1/get-phrases",auth,getAllPhrasesController);
vocabRouter.get("/api/v1/get-sentence",auth,getAllSentencesController);



module.exports={vocabRouter}