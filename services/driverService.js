"use strict";
var Driver = require('../models/Driver');
var validationUtil = require('../utils').validationUtil;
var _ = require('underscore');

class DriverService {

  constructor() {}

  add(driver) {
    return (new Driver(driver))
      .save()
      .then(null, validationUtil.createValidationResponse);
  }

  find(props) {
    return Driver.find(props);
  }

  remove(driver) {
    return Driver.remove({
      name: driver.name
    });
  }

  update(driver) {
    return Driver.findById(driver._id)
      .then((driverModel) => {
        _.extend(driverModel, driver);
        return driverModel.save()
          .then((driver) => {
            return driver;
          }, validationUtil.createValidationResponse);
      });

    // return Driver.findByIdAndUpdate(driver.id, driver, {new: true});
    // validationUtil.createValidationResponse);
  }

}

module.exports = new DriverService();
