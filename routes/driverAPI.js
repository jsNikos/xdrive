var express = require('express');
var router = express.Router();

var services = require('../services');
var Driver = require('../models/Driver');

router.route('/addDriver')
  .post((req, res) => {
    services.driverService
      .add(req.body.driver)
      .then((result) => {
        res.json(result || {});
      })
      .catch((e) => {
        throw new Error(e);
      });
  });

router.route('/removeDriver')
  .post((req, res) => {
    services.driverService
      .remove(req.body.driver)
      .then((result) => {
        res.json(result || {});
      })
      .catch((e) => {
        throw new Error(e);
      });
  });

router.route('/updateDriver')
  .post((req, res) => {
    services.driverService
      .update(req.body.driver)
      .then((resp) => {
        res.json(resp);
      })
      .catch((e) => {
        throw new Error(e);
      });
  });

router.route('/findAllDrivers')
  .get((req, res) => {
    Driver
      .find(undefined, {
        id: 1,
        name: 1,
        position: 1,
        punchedIn: 1,
        status: 1,
        firstname: 1,
        lastname: 1,
        email: 1,
        phone: 1
      })
      .then((drivers) => {
        res.json(drivers);
      })
      .catch((e) => {
        throw new Error(e);
      });
  });

module.exports = router;
