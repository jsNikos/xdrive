define(['text!customerRequest/customerRequest.html', 'resourceService', 'DateTimePickerComponent'],
function(customerRequestHtml, resourceService, DateTimePickerComponent) {
  return CustomerRequestComponent;

  function CustomerRequestComponent() {
    this.template = customerRequestHtml;

    this.data = function() {
      return {
        freeDrivers: [],
        customerRequest: undefined
      };
    };

    this.ready = function(){
      console.log('hereeerrer');
      jquery('#forWhen').datetimepicker();
    }

    this.methods = this;

  }
});
