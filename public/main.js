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
        resourceService: '../common/resourceService',
        geoService: '../common/geoService',
        ArrayUtils: '../common/ArrayUtils',
        datetimepicker: '../bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        datetimepickerCSS: '../bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min',
        moment: '../bower_components/moment/min/moment.min',
        VueDateTimePicker: '../common/VueDateTimePicker',
        'leaflet': '../bower_components/leaflet/dist/leaflet',
        'selectivity': '../bower_components/Selectivity.js/dist/selectivity-full.min',
        'selectivityCSS': '../bower_components/Selectivity.js/dist/selectivity-full.min',
        VueGeocodeSuggest: '../common/VueGeocodeSuggest',
        fontAwsome: '../bower_components/font-awesome/css/font-awesome.min'
    },
    shim: {
      bootstrap:{
        deps: ['jquery', 'css!../bower_components/bootstrap/dist/css/bootstrap.min.css']
      },
      selectivity:{
        deps:['jquery', 'css!selectivityCSS', 'bootstrap', 'css!fontAwsome']
      }
    },
    map: {
    	  '*': {
    	    css: 'css'
    	  }
    	}
});
