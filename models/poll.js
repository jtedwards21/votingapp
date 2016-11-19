var mongoose = require('mongoose');

module.exports = mongoose.model('Poll',{
creator: String,
title: String,
question: String,
totalvotes: Number,
choices: [{choice: String, votes: Number}]
})
