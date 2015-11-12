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

  describe('#remove', function(){
    it('should remove a driver', function(done){
      driverService
          .remove({name: 'test-driver-name'})
          .then(() => {
            driverService
              .find({name: 'test-driver-name'})
              .then((drivers) => {
                assert.equal(drivers.length === 0, true, 'no driver is expexted with name, test-driver-name');
                done();
              });
          })
          .catch(done);
    });
  });

  describe('enum validation', function(){
    it('should throw validation exception', function(done){
      driverService
          .add({name: 'test-driver-name', status: 'unvalid status xxx'})
          .then(() => {
            assert.equal(true, false, 'a validation exception is expected here');
            done();
          })
          .catch(() => {done();});
    });
  });

  describe('unique name validation', function(){
    it('should throw validation exception', function(done){
      driverService
          .add({name: 'test-driver-name'})
          .then(() => {
            driverService
                .add({name: 'test-driver-name'})
                .then(() => { assert.equal(true, false, 'a validation exception is expected here'); })
                .catch(() => cleanUp());
          })
          .catch(cleanUp);

          function cleanUp(err){
            driverService
              .remove({name: 'test-driver-name'})
              .then(() => { done(err); });
          }
    });
  });
});
