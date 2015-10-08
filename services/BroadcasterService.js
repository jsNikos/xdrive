"use strict";

class BroadcasterService{

addAuthenticatedConnection(request){
 //TODO check for logged-in session
 var connection = request.accept(request.origin);
}

addConnection(request){
  // accepct all
}

//TODO implement the other methods remove, subscribe, ...
// add logic to close connections when session destroys (authneticationsErvice)
// where the session is associated to the ws
// logout must ensure to destroy session



}

module.exports = BroadcasterService;





