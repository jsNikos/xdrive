"use strict";

var sessionService = require('./sessionService');

class AuthenticationService {
  constructor(){
		sessionService.on('destroy', () => {
			console.log('works');
		});
	}
  // makes the login/logout

}

module.exports = new AuthenticationService();
