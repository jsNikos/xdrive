define(['text!customerRequest/customerRequest.html', 'resourceService', 'VueDateTimePicker'],
function(customerRequestHtml, resourceService, DateTimePickerComponent) {
  return CustomerRequestComponent;

  function CustomerRequestComponent() {
    this.template = customerRequestHtml;

    this.data = function() {
      return {
        freeDrivers: [],
        customerRequest: {forWhen: new Date()}
      };
    };

    this.methods = this;

  }
});
