define(['q', 'jquery', 'underscore'],
  function(q, jquery, _) {
    return new ResourceService();

    function ResourceService() {

      /**
       * Generates ajax-request: options: {url, data} (all from jquery.ajax)
       **/
      this.ajax = function(options) {
        var xhr;
        var promise = q.Promise(function(resolve, reject) {
          options.success = resolve;
          options.error = reject;
          xhr = jquery.ajax(options);
        });
        promise.abort = xhr.abort.bind(xhr);
        return promise;
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
