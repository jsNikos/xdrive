define(['Vue', 'VueRouter'], function(Vue, VueRouter) {
  return Page;

  function Page() {
    var scope = this;
    var router = undefined; // vue-router
    var AppVue = undefined; // Vue-constructor
    var data = {
      authenticated: false,
      waitingForAuthentication: false,
      punchedIn: false,
      currentDrive: undefined // Drive, the current if any
    };

    function init() {
      Vue.use(VueRouter);
      initAppVue();
      initRouter();
      router.start(AppVue, '#app');
    }

    function initAppVue() {
      AppVue = Vue.extend({
        data: function() {
          return data
        },
        methods: scope
      });
    }

    function initRouter() {
      router = new VueRouter({});
      router.map({
        '/map': {
          component: function(resolve, reject) {
            require(['map/MapComponent'], function(MapComponent) {
              resolve(new MapComponent());
            });
          }
        },
        '/login': {
          component: function(resolve, reject) {
            require(['login/LoginComponent'], function(LoginComponent) {
              resolve(new LoginComponent());
            });
          }
        },
        '/schedule': {
          component: function(resolve, reject) {
            require(['schedule/ScheduleComponent'], function(ScheduleComponent) {
              resolve(new ScheduleComponent());
            });
          }
        }
      });
    }

    this.handlePunchIn = function() {
      //TODO
      debugger;
    };

    init();

  }

});
