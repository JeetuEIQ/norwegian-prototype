const mongoose = require("mongoose");

const SentenceSchema = mongoose.Schema({
    english:{type:String},
    norwegian:{type:String}
})

const sentenceModel = mongoose.model("sentenceModel",SentenceSchema);
module.exports = {sentenceModel};