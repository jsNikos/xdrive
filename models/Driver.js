var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Driver', new Schema({
    name: String,
    position: {latitude: Number, longitude: Number, time: Date},
    punchedIn: {type: Boolean, default: false},
    status: {type: String, default: 'free'} // free, waiting, driving
}));
