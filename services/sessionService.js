"use strict";

var utils = require('../utils');
var Session = require('../models/Session');

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



  // touches the db for persisted session
  // emits session destroy-events
  // it seems session must be destroyed from db by hand
  // scheduled task which is observing the session-store and call destroy on old ones


}

module.exports = new SessionService();
