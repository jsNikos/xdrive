define(['Vue', 'geoService', 'jquery', 'underscore', 'selectivity'],
  function(Vue, geoService, jquery, _) {
    return Vue.component('geocode-suggest', {
      replace: false,

      template: '<div class="input-group"></div>',

      data: function() {
        return {};
      },

      props: ['model', 'placeholder'],

      ready: function() {
        var vueScope = this;
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

        var $geocodeSuggest = jquery(this.$el).find('.input-group');
        $geocodeSuggest.selectivity({
          placeholder: this.$data.placeholder,
          query: function(search) {
            geoService.suggest(search.term)
              .then(function(response) {
                var mapped = _.chain(response.result).map(function(result) {
                  return {
                    text: _.chain(result).pluck(['city', 'countryCode', 'name']).value().join(', '),
                    id: result.id,
                    latitude: result.lat,
                    longitude: result.lng
                  };
                }).value();
                search.callback({
                  results: mapped
                });
              })
              .catch(console.log);
          }
        });

        // require(['../admin/Page'], function(Page) {
        //   new Page();
        //
        //   geoService.geocode('marburg salegrund')
        //     .then(console.log)
        //     .catch(console.log);
        //
        // });



        // ensure also ability add address details in text-input
        // and driver instructions
        // for customer add support to select address by selecting from map directly
        // (not all addresses are mapped)
        // results are not fine enough, cannot search street
        // care! need to ensure to also watch the model and to pre-init
        // this must be the resolved address, not the coordinates
        // address should be saved not only with coordinates but name,display from geocoding
        // it must be the 'name' property in there

      }
    });
  });
