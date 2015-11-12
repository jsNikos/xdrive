"use strict";
var CustomerRequest = require('../models/CustomerRequest');

class CustomerRequestService {

  constructor() {
  }

  add(customerRequest){
    return (new CustomerRequest(customerRequest)).save();
  }

  find(props){
    return CustomerRequest.find(props);
  }

  remove(customerRequest){
    return CustomerRequest.remove(customerRequest);
  }

}

module.exports = new CustomerRequestService();
