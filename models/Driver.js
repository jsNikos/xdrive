var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-beautiful-unique-validation');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Driver', new Schema({
  name: {
    type: String,
    required: 'A name is needed',
    unique: 'Another user already uses this value',
    uniqueCaseInsensitive: true
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: 'A email address is needed'
  },
  phone:{
    type: String,
    required: 'A phone number is needed',
    match: [/^[0-9]+$/, 'Must be a number']
  },
  position: {
    latitude: Number,
    longitude: Number,
    time: Date
  },
  punchedIn: {
    type: Boolean,
    default: false,
    required: true
  },
  status: {
    type: String,
    default: 'free',
    enum: ['free', 'waiting', 'driving'],
    required: true
  }
}).plugin(uniqueValidator));
