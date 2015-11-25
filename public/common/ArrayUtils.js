define(['underscore'], function(_) {
  return function(arr) {
    return new ArrayUtils(arr);
  };

  function ArrayUtils(arr) {
    var scope = this;
    this.value = arr;
    /**
     * Removes all elements from array which have the given prop-to-value.
     **/
    this.removeByProps = function(props) {
      _.chain(this.value)
        .where(props)
        .each(function(elem) {
          var idx = scope.value.indexOf(elem);
          if (idx > -1) {
            scope.value.splice(idx, 1);
          }
        });
      return this;
    };
  }

});
