requirejs.config({
    baseUrl: '.',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        Vue: '../bower_components/vue/dist/vue.min',
        VueRouter: '../bower_components/vue-router/dist/vue-router.min',
        VueResource: '../bower_components/vue-resource/dist/vue-resource.min',        
        text: '../bower_components/text/text',
        css: '../bower_components/require-css/css.min',
        q: '../bower_components/q/q',
        underscore: '../bower_components/underscore/underscore-min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        resourceService: '../common/resourceService'
    },
    shim: {
      bootstrap:{
        deps: ['jquery', 'css!../bower_components/bootstrap/dist/css/bootstrap.min.css']
      }
    },
    map: {
    	  '*': {
    	    css: 'css'
    	  }
    	}
});
