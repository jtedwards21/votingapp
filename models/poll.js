var mongoose = require('mongoose');

var choiceSchema = mongoose.Schema({
choice: String,
votes: Number
})

module.exports = mongoose.model('Poll',{
creator: String,
title: String,
question: String,
totalvotes: Number,
choices: [choiceSchema]
})
