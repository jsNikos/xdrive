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

}

module.exports = new DriverService();
