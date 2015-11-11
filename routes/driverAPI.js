var express = require('express');
var router = express.Router();

var services = require('../services');
var services = require('../services');

/* Posts routes */
router.route('/add')
  .post((req, res) => {
    services.driverService
    .add(req.body.driver)
    .then(() => { res.end(); })
    .catch((e) => {throw new Error(e);});
  });

module.exports = router;
