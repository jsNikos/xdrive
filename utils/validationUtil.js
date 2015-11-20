"use strict";
var _ = require('underscore');

class ValidationUtil {

  /**
  * From the given mongoose ValidationError returns validation object
  * suitable to return as response.
  **/
  createValidationResponse(err) {
    let errors =
     _.chain(err.errors)
      .pick(_.keys(err.errors))
      .mapObject((val) => {
        return _.pick(val, ['kind', 'message', 'name', 'path', 'value']);
      })
      .value();

      return {errors};
  }

}

module.exports = new ValidationUtil();
