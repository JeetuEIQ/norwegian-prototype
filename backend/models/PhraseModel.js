const mongoose = require("mongoose");

const PhraseSchema = mongoose.Schema({
    english:{type:String},
    norwegian:{type:String}
})

const phraseModel = mongoose.model("phraseModel",PhraseSchema);
module.exports = {phraseModel};