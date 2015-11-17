define(['Vue', 'q'], function(Vue, q){
  return new ResourceService();

  function ResourceService(){

    this.fetch = function(options){
      return q.Promise(function(resolve, reject){
        options.success = resolve;
        options.error = reject;
        Vue.http.get(options);
      });
    };

  }
});
