"use strict";
var Driver = require('../models/Driver');

class DriverService {

  constructor() {
  }

  add(driver){
    var driverModel = new Driver(driver);
    return driverModel.save();
  }

  find(props){
    return Driver.find(props);
  }



}

module.exports = new DriverService();
