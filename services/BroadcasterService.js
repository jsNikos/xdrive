"use strict";

var authentivationService = require('.').authenticationService; 

class BroadcasterService{

constructor(){
this.connections = [];
}

/**
* These connection-requests are checked to have logged-in session.
* In case they are accepted and will get added to connections 
* and adding a destroy-listener to the session which triggers to remove the connection.
**/
addAuthenticatedConnection(request){
 //TODO  check for logged-in session
 // add session-destroy listener to session
 var connection = addConnection(request);
 // var orig_destroy = session.destroy;   !! this doesn't work because method not deserialized
 // session.destroy = () => { orig_destroy.call(session); 
// this.removeConnection(connection);
 //}; 
 
}

addConnection(request){
  var connection = request.accept(request.origin);
  // TODO register close, error listener which removes the connection
  this.connections.push(connection);
  return connection;
}

//TODO implement the other methods remove, subscribe, ...
// add logic to close connections when session destroys (authneticationsErvice)
// where the session is associated to the ws
// logout must ensure to destroy session



}

module.exports = BroadcasterService;





