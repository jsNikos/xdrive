var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Session', new Schema({
  session: String,
  expires: Date
}));
