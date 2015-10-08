var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

module.exports = new Schema({  
    latitude: Number,
    longitude: Number,
    time: Date
});  