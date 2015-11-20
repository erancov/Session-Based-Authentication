'use strict';

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;


var clientSchema = new Schema({
  email:  {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  passwordSalt: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// compile Client model
module.exports = mongoose.model('Client', clientSchema);
