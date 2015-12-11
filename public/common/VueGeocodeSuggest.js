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
        var suggestRequest = undefined;
        var requestTimeout = undefined;

        var $geocodeSuggest = jquery(this.$el).find('.input-group');
        $geocodeSuggest.selectivity({
          placeholder: this.$data.placeholder,
          data: extractPreSelection(this.$data.model),
          query: function(search) {
            if (requestTimeout != undefined) {
              clearTimeout(requestTimeout);
            }
            requestTimeout = setTimeout(createSuggestionRequest, 300, search);
          }
        });

        $geocodeSuggest.on('selectivity-selected', function(event) {
          vueScope.$set('model', event.item);
        });

        // this.$watch('model', function(date){
        //   $datepicker.data('DateTimePicker').date(this.$data.model);
        // });

        function createSuggestionRequest(search) {
          if (suggestRequest) {
            suggestRequest.abort();
          }
          suggestRequest = geoService.suggest(search.term);
          suggestRequest
            .then(function(response) {
              var mapped = _.chain(response.response.docs).map(function(doc) {
                return {
                  text: extractDisplayName(doc),
                  name: doc.name,
                  id: doc.feature_id,
                  country_code: doc.country_code,
                  city: doc.is_in,
                  placetype: doc.placetype,
                  latitude: doc.lat,
                  longitude: doc.lng
                };
              }).value();
              search.callback({
                results: mapped
              });
            })
            .catch(function(err) {
              if (err.statusText === 'abort') {} else {
                console.log(err);
              }
            });
        }

        /**
         * @param location: customerRequest.fromWhere/toWhere
         **/
        function extractPreSelection(location) {
          if (!location) {
            return undefined;
          }
          return _.extend(location, {
            id: location.feature_id,
            text: extractDisplayName(location)
          });
        }

        function extractDisplayName(doc) {
          var props = ['name', 'country_code'];
          if (doc.placetype === 'Street') {
            props = ['name', 'is_in', 'country_code'];
          }
          return _.chain(doc).pick(props).values().value().join(', ');
        }

        // ensure also ability add address details in text-input
        // and driver instructions
        // for customer add support to select address by selecting from map directly
        // (not all addresses are mapped)
        // care! need to ensure to also watch the model and to pre-init
        // this must be the resolved address, not the coordinates
        // address should be saved not only with coordinates but name,display from geocoding
        // after searching the map should go to the fromWhere/toWhere, if now clicking into the map
        // the clicked location is resolved and taken as fromWhere/toWhere, this must be a one-time-listener
        // and is connected with the last used fromWhere/toWhere
        // housenumber search could be supported but is extention: (is prop in doc 'house_numbers')
        // watch the bind-model value for changes and if discovered (or at init)
        // preselect the suggestion (geocode??)

      }
    });
  });
