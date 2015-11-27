define(['Vue', 'VueRouter'], function(Vue, VueRouter) {
  return PageRouter;

  function PageRouter() {
    var vueRouter = new VueRouter({});

    function init() {
      vueRouter.map({
        '/drivers': {
          component: function(resolve, reject) {
            require(['drivers/DriversComponent'], function(DriversComponent) {
              resolve(new DriversComponent());
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
        '/customerRequest': {
          component: function(resolve, reject) {
            require(['customerRequest/CustomerRequestComponent'], function(CustomerRequestComponent) {
              resolve(new CustomerRequestComponent());
            });
          }
        },
      });
    }

    this.start = function(App, el) {
      vueRouter.start(App, el);
    };

    init();
  }
});
