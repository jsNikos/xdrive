module.exports = {posts : require('./posts'),
				 broadcasterService: new (require('./BroadcasterService')),
				 authenticationService: new (require('./AuthenticationService'))};