define(['text!customerRequest/customerRequest.html', 'resourceService', 'VueDateTimePicker', 'VueGeocodeSuggest'],
function(customerRequestHtml, resourceService) {
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
