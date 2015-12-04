define(['Vue', 'esri-leaflet-geocoder', 'jquery', 'underscore', 'selectivity'],
  function(Vue, Geocoding, jquery, _) {
    return Vue.component('geocode-suggest', {
      replace: false,

      template: '<div class="input-group"></div>',

      data: function() {
        return {};
      },

      props: ['model', 'placeholder'],

      ready: function() {
        // var vueScope = this;
        // var $datepicker = jquery(this.$el).find('.input-group.date');
        // $datepicker.datetimepicker();
        // $datepicker.data('DateTimePicker').date(this.$data.model);
        // $datepicker.on('dp.change', function(date){
        //   vueScope.$set('model', date ? date.date.toDate() : null);
        // });
        //
        // this.$watch('model', function(date){
        //   $datepicker.data('DateTimePicker').date(this.$data.model);
        // });
        // var geocodeService = Geocoding.geocodeServiceProvider({useMapBounds: false});

        // var $geocodeSuggest = jquery(this.$el).find('.input-group');
        // $geocodeSuggest.selectivity({
        //   placeholder: this.$data.placeholder,
        //   query: function(search) {
        //     Geocoding.geocode().text(search.term).run(function(err, geo, response) {
        //       var mapped = _.chain(geo.results).map(function(result) {
        //         return {
        //           text: result.text,
        //           id: result.text,
        //           latitude: result.latlng.lat,
        //           longitude: result.latlng.lng
        //         };
        //       }).value();
        //       search.callback({
        //         results: mapped
        //       });
        //     });
        //   }
        // });


        //TODO
        Geocoding.geocode({})
                .text('marburg')
                .run(function(err, results, response) {
          console.log(results);
        });
        // results are not fine enough, cannot search street

        // care! need to ensure to also watch the model and to pre-init
        // this must be the resolved address, not the coordinates
        // address should be saved not only with coordinates but name,display from geocoding
        // it must be the 'name' property in there

      }
    });
  });
