define(['text!drivers/drivers.html'], function(driversHtml) {
  return DriversComponent;

  function DriversComponent() {
    this.template = driversHtml;

    this.route = {
      data: function() {
        //TODO return a promise via return dataService.get ...
        debugger;
        return;
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
