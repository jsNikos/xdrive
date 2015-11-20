var express = require('express');
var router = express.Router();

var services = require('../services');
var Driver = require('../models/Driver');

/* Posts routes */
router.route('/addDriver')
  .post((req, res) => {
    services.driverService
      .add(req.body.driver)
      .then((err) => {
        res.json(err || {});
      })
      .catch((e) => {        
        throw new Error(e);
      });
  });

router.route('/findAllDrivers')
  .get((req, res) => {
    Driver
      .find(undefined, {
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
