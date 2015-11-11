define(['Vue', 'VueRouter'], function(Vue, VueRouter){
  return PageRouter;

  function PageRouter(){
    var vueRouter = new VueRouter({});

    function init(){
      vueRouter.map({
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

    this.start = function(App, el){
      vueRouter.start(App, el);
    };

    init();
  }
});
