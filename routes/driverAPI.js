var express = require('express');
var router = express.Router();

var services = require('../services');

/* Posts routes */
router.route('/addDriver')
  .post((req, res) => {
    services.driverService
    .add(req.body.driver)
    .then(() => { res.end(); })
    .catch((e) => {throw new Error(e);});
  });

router.route('/findAllDrivers')
  .get((req, res) => {
    services.driverService
    .find()
    .then((drivers) => {
      res.json(drivers);
    })
    .catch((e) => {throw new Error(e);});
  });

module.exports = router;
