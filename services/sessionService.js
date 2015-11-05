"use strict";

var utils = require('../utils');
var Session = require('../models/Session');

/**
* Observes the session-store for expired session. In case removes this and fire a destroy-event.
**/
class SessionService extends utils.EventEmitter {

  constructor() {
    super();

    // emitted events
    this.destroy = 'destroy';

    this.checkExpiredSessions();
  }

  checkExpiredSessions() {
    let now = new Date();
    let stream = Session.find({
        expires: {
          $lt: now
        }
      })
      .stream()
      .on('data', (session) => {
        this.removeSession(session.id)
						.then(null, console.log);
      })
			.on('error', console.log)
      .on('end', () => {
				let nextRun = require('../app').get('sessionExpirationIntervalMillis');
				setTimeout(this.checkExpiredSessions.bind(this), nextRun);
      });
  }


	removeSession(sessionId){
		return Session.remove({id: sessionId})
				          .exec()
									.then(() => {
												this.emit(this.destroy);
									});
	}

}

module.exports = new SessionService();
