define(['text!drivers/drivers.html', 'resourceService', 'underscore'],
function(driversHtml, resourceService, _) {
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

    this.events = {
      'cancel-edit': handleCancelEdit,
      'added-driver': handleAddedDriver,
      'remove': handleRemove,
      'updated-driver': handleUpdateDriver
    };

    function handleUpdateDriver(driver){
      this.$set('showEditor', false);
      _.chain(this.$get('drivers'))
          .findWhere({_id: driver._id})
          .extend(driver);
    }

    function handleAddedDriver(driver) {
      this.$set('showEditor', false);
      this.$data.drivers.push(driver);
    }

    function handleRemove(driver){
      //TODO
    }

    function handleCancelEdit() {
      this.$set('showEditor', false);
      this.$set('selectedDriver', undefined);
    };

    this.methods = this;

    this.components = {
      'driver-editor': function(resolve, reject) {
        require(['drivers/EditorComponent'], function(EditorComponent) {
          resolve(new EditorComponent());
        });
      }
    }

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
