const { failure, success } = require("../helper/response");
const { phraseModel } = require("../models/PhraseModel");
const { sentenceModel } = require("../models/SentenceModel");
const { wordModel } = require("../models/WordModel")
const {getAllWords,getAllPhrases,getAllSentences} =require("../services/VocabService")
const wordController=async(req,res)=>{
    try {
        const {english,norwegian} = req.body.data
        const checkWord=await wordModel.findOne({"english.word":english.word}); 
        if(checkWord) return failure(res,500,"Word Already exist");

        const postData={
            english:english,
            norwegian:norwegian
        }

        const newWordDetails= await wordModel.create(postData);

        success(res,200,newWordDetails);

    } catch (error) {
        failure(res,500,error.message);
    }
}

const sentenceController=async(req,res)=>{
    try {
        const sentence = req.body.data;
        const checkSentence = await sentenceModel.findOne({english:sentence.english})
        if(checkSentence) return failure(res,500,"Sentence already exist");
        const newSentence = await sentenceModel.create(sentence);

        success(res,200,newSentence);

    } catch (error) {
        failure(res,500,error.message);
    }
}
const phraseController=async(req,res)=>{
    try {
        const phrase = req.body.data;

        const checkPhrase = await phraseModel.findOne({english:phrase.english})
        if(checkPhrase) return failure(res,500,"Sentence already exist");
        const newPhrase = await phraseModel.create(phrase);

        success(res,200,newPhrase);

    } catch (error) {
        failure(res,500,error.message);
    }
}

const getAllWordController=async(req,res)=>{
    try {
        const data = await getAllWords()
        res.send({
            status:200,
            data
        })
    } catch (error) {
        failure(res,500,error.message)
    }
}
const getAllPhrasesController=async(req,res)=>{
    try {
        const data = await getAllPhrases()
        console.log(data)
        res.send({
            status:200,
            data
        })
    } catch (error) {
        failure(res,500,error.message)
    }
}
const getAllSentencesController=async(req,res)=>{
    try {
        const data = await getAllSentences()
        console.log(data)
        res.send({
            status:200,
            data
        })
    } catch (error) {
        failure(res,500,error.message)
    }
}



module.exports={wordController,phraseController,sentenceController,getAllWordController,getAllPhrasesController,getAllSentencesController}