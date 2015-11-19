"use strict";
var Driver = require('../models/Driver');

class DriverService {

  constructor() {
  }

  add(driver){
    //TODO validation in case errors reject with valiadation-object
    // {name: {required: true, unique: true}, ...}
    return (new Driver(driver)).save();
  }

  find(props){
    return Driver.find(props);
  }

  remove(driver){
    return Driver.remove({name: driver.name});
  }

}

module.exports = new DriverService();
