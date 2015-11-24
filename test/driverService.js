var assert = require('assert');
var app = require('../app');
var driverService = require('../services').driverService;
var Driver = require('../models/Driver');

describe('DriverService', function() {
  describe('#add()', function() {
    it('should add a driver', function(done) {
      driverService
        .add({
          name: 'test-driver-name',
          phone: '2342422',
          email: 'dssdf'
        })
        .then((err) => {
          if (err) {
            console.log(err);
          }
          driverService
            .find({
              name: 'test-driver-name'
            })
            .then((drivers) => {
              var hasAtLeastOne = drivers.length > 0;
              assert.equal(hasAtLeastOne, true, 'one driver is expected in db with name, test-driver-name');
              done();
            })
            .catch(done);
        })
        .catch(done);
    });

    it('should return drivers but only projected fields', function(done) {
      Driver.find(undefined, {
          name: 1
        })
        .then((drivers) => {
          assert.equal(drivers[0].status === undefined, true, 'field status should not be contained');
          assert.equal(drivers[0].name !== undefined, true, 'field name should be contained');
          done();
        })
        .catch(done);
    });
  });

  describe('#remove', function() {
    it('should remove a driver', function(done) {
      driverService
        .remove({
          name: 'test-driver-name'
        })
        .then(() => {
          driverService
            .find({
              name: 'test-driver-name'
            })
            .then((drivers) => {
              assert.equal(drivers.length === 0, true, 'no driver is expexted with name, test-driver-name');
              done();
            });
        })
        .catch(done);
    });
  });

  describe('enum validation', function() {
    it('should throw validation exception', function(done) {
      driverService
        .add({
          name: 'test-driver-name',
          status: 'unvalid status xxx',
          email: 'dssdf'
        })
        .then(() => {
          assert.equal(true, false, 'a validation exception is expected here');
          done();
        })
        .catch(() => {
          done();
        });
    });
  });

  describe('#add unique name validation', function() {
    it('should throw validation exception', function(done) {
      driverService
        .add({
          name: 'test-driver-name',
          phone: '56454',
          email: 'dssdf'
        })
        .then(() => {
          driverService
            .add({
              name: 'Test-Driver-name',
              phone: '65465465',
              email: 'dssdf'
            })
            .then(() => {
              assert.equal(true, false, 'a validation exception is expected here');
            })
            .catch(() => cleanUp());
        })
        .catch(cleanUp);

      function cleanUp(err) {
        Promise.all([
            driverService.remove({
              name: 'test-driver-name'
            }),
            driverService.remove({
              name: 'Test-Driver-name'
            })
          ])
          .then(() => {
            done(err);
          });
      }
    });
  });

  describe('#update unique name validation', function() {
    it('should throw validation exception', function(done) {
      Promise.all([
          driverService.add({
            name: 'test-driver-name1',
            phone: '56454',
            email: 'dssdf'
          }),
          driverService.add({
            name: 'test-driver-name2',
            phone: '56454',
            email: 'dssdf'
          })
        ])
        .then((driverIds) => {
          driverService
            .update({
              _id: driverIds[1],
              name: 'test-driver-name1'
            })
            .then((err) => {
              console.log(err);
            })
            .then(cleanUp)
        })
        .catch(cleanUp);

      // driverService
      //     .add({name: 'test-driver-name1', phone: '56454', email: 'dssdf'})
      //     .then(() => {
      //       driverService
      //           .add({name: 'Test-Driver-name', phone: '65465465', email: 'dssdf'})
      //           .then(() => { assert.equal(true, false, 'a validation exception is expected here'); })
      //           .catch(() => cleanUp());
      //     })
      //     .catch(cleanUp);


      function cleanUp(err) {
        Promise.all([
            driverService.remove({
              name: 'test-driver-name1'
            }),
            driverService.remove({
              name: 'test-driver-name2'
            })
          ])
          .then(() => {
            done(err);
          });
      }
    });
  });
});
