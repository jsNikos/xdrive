var assert = require('assert');
var app = require('../app');
var driverService = require('../services').driverService;

describe('DriverService', function() {
  describe('#add()', function () {
    it('should add a driver', function (done) {
      driverService
            .add({name: 'test-driver-name'})
            .then((driver) => {
                  driverService
                        .find({name: 'test-driver-name'})
                        .then((drivers) => {
                          var hasAtLeastOne = drivers.length > 0;
                          assert.equal(hasAtLeastOne, true, 'one driver is expected in db with name, test-driver-name');
                          done();
                          });
            })
            .catch(done);
    });
  });
});
