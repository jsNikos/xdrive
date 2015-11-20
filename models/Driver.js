var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Driver', new Schema({
  name: {
    type: String,
    required: 'A name is needed',
    unique: 'This name is already used by another driver'
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
    required: 'A phone number is needed'
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
}));
