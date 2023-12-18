const { phraseModel } = require("../models/PhraseModel");
const { sentenceModel } = require("../models/SentenceModel");
const { wordModel } = require("../models/WordModel")



const getAllWords=async ()=>{
    const allWords = await wordModel.find();
    return allWords
}
const getAllPhrases=async ()=>{
    const allWords = await phraseModel.find();
    return allWords
}
const getAllSentences=async ()=>{
    const allWords = await sentenceModel.find();
    return allWords
}


module.exports={getAllWords,getAllPhrases,getAllSentences}