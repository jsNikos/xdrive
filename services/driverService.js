"use strict";
var Driver = require('../models/Driver');
var validationUtil = require('../utils').validationUtil;
var _ = require('underscore');

class DriverService {

  constructor() {}

  add(driver) {
    return (new Driver(driver))
      .trySave()
      .then((savedDriver) => {
        return {
          _id: savedDriver.id
        };
      }, validationUtil.createValidationResponse);
  }

  find(props) {
    return Driver.find(props);
  }

  remove(driver) {
    return Driver.remove({
      _id: driver._id
    });
  }

  update(driver) {
    return Driver
      .findById(driver._id)
      .then((driverModel) => {
        _.extend(driverModel, driver);
        return driverModel.trySave();
      })
      .then(() => driver, validationUtil.createValidationResponse);
  }
}



module.exports = new DriverService();
