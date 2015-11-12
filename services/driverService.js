"use strict";
var Driver = require('../models/Driver');

class DriverService {

  constructor() {
  }

  add(driver){
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
