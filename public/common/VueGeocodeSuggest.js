define(['Vue', 'geoService', 'jquery', 'underscore', 'selectivity'],
  function(Vue, geoService, jquery, _) {
    return Vue.component('geocode-suggest', {
      replace: false,

      template: '<div class="input-group"></div>',

      data: function() {
        return {};
      },

      props: ['model', 'placeholder'],

      ready: handleReady
    });

    function handleReady() {
      var vueScope = this;
      var suggestRequest = undefined;
      var requestTimeout = undefined;
      var $geocodeSuggest = undefined;

      initSuggestInput();

      function initSuggestInput() {
        $geocodeSuggest = jquery(vueScope.$el).find('.input-group');
        $geocodeSuggest.selectivity({
          placeholder: vueScope.$data.placeholder,
          data: extractPreSelection(vueScope.$data.model),
          query: function(search) {
            if (requestTimeout != undefined) {
              clearTimeout(requestTimeout);
            }
            requestTimeout = setTimeout(createSuggestionRequest, 300, search);
          }
        });

        $geocodeSuggest.on('selectivity-selected', function(event) {
          var item = _.chain(event.item)
            .extend({
              feature_id: event.item.id
            }).pick(['latitude', 'longitude', 'is_in', 'country_code', 'name',
              'placetype', 'feature_id'
            ]).value();
          vueScope.$set('model', item);
        });

        vueScope.$watch('model', function(model) {
          $geocodeSuggest.selectivity('data', extractPreSelection(model));
        });
      }

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
                is_in: doc.is_in,
                placetype: doc.placetype,
                latitude: doc.lat,
                longitude: doc.lng,
                is_in: doc.is_in
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

    }
  });
