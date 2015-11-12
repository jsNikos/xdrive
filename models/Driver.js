var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Driver', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
