var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('CustomerRequest', new Schema({
    name: String,
    driver: String, // assigned driver
    forWhen: Date,
    forWhere: {latitude: Number, longitude: Number},
    toWhere: {latitude: Number, longitude: Number},
    status: {type: String, default: 'open'} // open, taken, finished, canceled
}));
