"use strict";
var Driver = require('../models/Driver');
var validationUtil = require('../utils').validationUtil;
var _ = require('underscore');

class DriverService {

  constructor() {}

  add(driver) {
    return (new Driver(driver))
      .save()
      .then((savedDriver) => savedDriver.id, validationUtil.createValidationResponse);
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
    return Driver.findOneAndUpdate({
        _id: driver._id
      }, driver, {
        runValidators: true,
        context: 'query'
      })
      .then((driver) => driver, (err) => err);

    // return Driver.findById(driver._id)
    //   .then((driverModel) => {
    //     _.extend(driverModel, driver);
    //     return driverModel.save({runValidators: true, context: 'query' })
    //       .then((driver) => {
    //         return driver;
    //       }, validationUtil.createValidationResponse);
    //   });

    // return Driver.findByIdAndUpdate(driver.id, driver, {new: true});
    // validationUtil.createValidationResponse);
  }

}

module.exports = new DriverService();
