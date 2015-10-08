var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

module.exports = mongoose.model('CustomerRequest', new Schema({  
    name: String,
    forWhen: Date,
    forWhere: {latitude: Number, longitude: Number},
    toWhere: {latitude: Number, longitude: Number}
}));  