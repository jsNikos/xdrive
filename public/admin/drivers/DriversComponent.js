define(['text!drivers/drivers.html', 'resourceService', 'underscore', 'ArrayUtils'],
function(driversHtml, resourceService, _, ArrayUtils) {
  return DriversComponent;

  function DriversComponent() {
    this.template = driversHtml;

    this.route = {
      data: function() {
        var vueComp = this;
        resourceService
          .fetch({
            url: '/api/driver/findAllDrivers',
            method: 'GET'
          })
          .then(function(drivers) {
            vueComp.$set('drivers', drivers);
          })
          .catch(function(e) {
            console.error(e);
          });
      }
    };

    this.data = function() {
      return {
        showEditor: false,
        selectedDriver: undefined,
        isEditing: false,
        drivers: undefined
      };
    };

    this.methods = this;

    this.components = {
      'driver-editor': function(resolve, reject) {
        require(['drivers/EditorComponent'], function(EditorComponent) {
          resolve(new EditorComponent());
        });
      }
    }

    this.events = {
      'cancel-edit': handleCancelEdit,
      'added-driver': handleAddedDriver,
      'removed-driver': handleRemovedDriver,
      'updated-driver': handleUpdatedDriver
    };

    function handleUpdatedDriver(driver){
      this.$set('showEditor', false);
      _.chain(this.$get('drivers'))
          .findWhere({_id: driver._id})
          .extend(driver);
    }

    function handleAddedDriver(driver) {
      this.$set('showEditor', false);
      this.$data.drivers.push(driver);
      this.$set('selectedDriver', undefined);
    }

    function handleRemovedDriver(driver){
      this.$set('showEditor', false);
      ArrayUtils(this.$data.drivers).removeByProps({_id: driver._id});
      this.$set('selectedDriver', undefined);
    }

    function handleCancelEdit() {
      this.$set('showEditor', false);
      this.$set('selectedDriver', undefined);
    };

    this.handleDriverSelected = function(driver) {
      this.$set('selectedDriver', JSON.parse(JSON.stringify(driver)));
      this.$set('isEditing', true);
      this.$data.showEditor = true;
    };

    this.handleCreateNew = function() {
      this.$set('isEditing', false);
      this.$set('showEditor', true);
      this.$set('selectedDriver', {});
    };
  }
});
