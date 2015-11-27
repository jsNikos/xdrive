var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('CustomerRequest', new Schema({
  name: String,
  driver: String, // assigned driver
  forWhen: {
    type: Date,
    required: true
  },
  fromWhere: {
    type: {
      latitude: Number,
      longitude: Number
    },
    required: true
  },
  toWhere: {
    latitude: Number,
    longitude: Number
  },
  status: {
    type: String,
    default: 'open',
    enum: ['open', 'taken', 'finished', 'canceled'],
    required: true
  }
}));
