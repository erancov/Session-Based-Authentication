'use strict';

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var ClientSchema = new mongoose.Schema({
  email : {type:String,
  required: true
  },
  password:{type:String,
  required: true
  },
  name:String,
   createdAt:{ type: Date,
    default: Date.now
  }
});

// compile Client model
module.exports = mongoose.model('ClientModel', ClientSchema);
