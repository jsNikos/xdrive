"use strict";

class AuthenticationService{
	
// touches the db for persisted session
// makes the login/logout
// emits session destroy-events
// it seems session must be destroyed from db by hand
// scheduled task which is observing the session-store and call destroy on old ones

}

module.exports = AuthenticationService;