const mongoose = require("mongoose");

// Define a subdocument schema for the word details
const wordDetailsSchema = new mongoose.Schema({
    word: String,
    parts_of_speech: String,
    definition: String,
    sentence: String,
    present_simple: String,
    present_continuous: String,
    present_perfect: String,
    present_perfect_continuous: String,
    past_simple: String,
    past_continuous: String,
    past_perfect: String,
    past_perfect_continuous: String,
    future_simple: String,
    future_continuous: String,
    future_perfect: String,
    future_perfect_continuous: String,
});

const WordSchema =  mongoose.Schema({
    english: wordDetailsSchema, // English word details as a subdocument
    norwegian: wordDetailsSchema, // Norwegian translation details as a subdocument
});

const wordModel = mongoose.model("Word", WordSchema);
module.exports = {wordModel};
