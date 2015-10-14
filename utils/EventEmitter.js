"use strict";

class EventEmitter {
  constructor() {
    this.eventHandlerRegistry = {};
  }


  /**
   * Registers given handler for given event.
   * @method on
   * @param event {string}
   * @param handler {function}
   */
  on(event, handler) {
    if (!this.eventHandlerRegistry[event]) {
      this.eventHandlerRegistry[event] = [];
    }
    this.eventHandlerRegistry[event].push(handler);
    return this;
  };

  /**
   * Emits given event and applies on all registered handlers.
   * @method emit
   * @param event {string}
   * @param args {object}
   */
  emit(event, args) {
    var handlers = this.eventHandlerRegistry[event];
    if (!handlers) {
      return;
    }
    this.eventHandlerRegistry[event].forEach((handler) => {
      handler(args);
    });
    return this;
  };

}

module.exports = EventEmitter;
