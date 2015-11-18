define(['Vue', 'VueRouter', 'PageRouter', 'VueResource', 'VueValidator'],
function(Vue, VueRouter, PageRouter, VueResource, VueValidator) {
  return Page;

  function Page() {
    var scope = this;
    var pageRouter = undefined; // PageRouter
    var AppVue = undefined; // Vue-constructor
    var data = {
      authenticated: false,
      waitingForAuthentication: false
    };

    function init() {
      Vue.use(VueRouter);
      Vue.use(VueResource);
      Vue.use(VueValidator);
      initAppVue();
      pageRouter = new PageRouter();
      pageRouter.start(AppVue, '#app');
    }

    function initAppVue() {
      AppVue = Vue.extend({
        data: function() {
          return data
        },
        methods: scope
      });
    }

    init();

  }

});
