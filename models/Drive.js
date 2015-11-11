var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Drive', new Schema({
    driver: String,
    customerRequest: String,
    starttime: Date,
    endtime: Date,
    positions: [{latitude: Number, longitude: Number, time: Date}]
}));
