define(['text!drivers/drivers.html', 'resourceService'], function(driversHtml, resourceService) {
  return DriversComponent;

  function DriversComponent() {
    this.template = driversHtml;

    this.route = {
      data: function() {
        var vueComp = this;
        resourceService
          .fetch({url: '/api/driver/findAllDrivers', method: 'GET'})
          .then(function(drivers){
            vueComp.$set('drivers', drivers);
          })
          .catch(function(e){
            console.error(e);
          });
      }
    };

    this.data = function() {
      return {
        showEditor: false,
        selectedDriver: 'test driver'
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

    this.handleDriverSelected = function() {
      //TODO
      this.$data.showEditor = true;
    };
  }
});
