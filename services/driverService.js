"use strict";
var Driver = require('../models/Driver');
var validationUtil = require('../utils').validationUtil;
var _ = require('underscore');

class DriverService {

  constructor() {}

  add(driver) {
    return this.customValidateDriver(driver)
      .then(() => {
        return (new Driver(driver))
          .save()
          .then(null, validationUtil.createValidationResponse);
      }, validationUtil.createValidationResponse);
  }

  customValidateDriver(driver) {
    return new Promise((resolve, reject) => {
      if (driver.phone && !/^[0-9]+$/.test(driver.phone)) {
        reject({
          errors: {
            phone: {
              message: 'Must be a number'
            }
          }
        });
      } else {
        resolve();
      }
    });
  }

  find(props) {
    return Driver.find(props);
  }

  remove(driver) {
    return Driver.remove({
      name: driver.name
    });
  }

}

module.exports = new DriverService();
