var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

module.exports = mongoose.model('Driver', new Schema({  
    name: String,
    position: {latitude: Number, longitude: Number, time: Date},
    punchedIn: Boolean,
    content: String,
    status: String
}));  