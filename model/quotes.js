'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuotesSchema = new Schema({
  author: String,
  text: String
  // TODO make each quote more robust
});

module.exports = mongoose.model('Quote', QuotesSchema);
