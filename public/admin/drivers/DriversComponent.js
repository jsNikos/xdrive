define(['text!drivers/drivers.html', 'resourceService'], function(driversHtml, resourceService) {
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
      'submit-edit': handleSubmitEdit,
      'remove': handleRemove
    };

    function handleSubmitEdit(driver) {
      this.$set('showEditor', false);
      //TODO submit to server
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
      //TODO
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
