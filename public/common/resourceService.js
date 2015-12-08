define(['Vue', 'q', 'jquery', 'underscore'], function(Vue, q, jquery, _) {
  return new ResourceService();

  function ResourceService() {

    this.fetch = function(options) {
      return q.Promise(function(resolve, reject) {
        options.success = resolve;
        options.error = reject;
        Vue.http.get(options);
      });
    };

    /**
     * Generates jsonp-request: options: {url, data} (all from jquery.ajax)
     **/
    this.jsonp = function(options) {
      options = _.extend(options, {
        crossDomain: true,
        dataType: 'jsonp'
      });
      return q.Promise(function(resolve, reject) {
        jquery.ajax(options)
          .then(resolve)
          .fail(reject);
      });
    };

  }
});
