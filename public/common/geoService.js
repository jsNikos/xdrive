define(['resourceService', 'jquery', 'q'], function(resourceService, jquery, q) {
  return new GeoService();

  function GeoService() {

    this.geocode = function(address, country) {
      return resourceService.jsonp({
        url: 'http://services.gisgraphy.com/geocoding/geocode',
        data: {
          address: address,
          country: country || 'DE',
          format: 'json'
        }
      });
    };

    this.suggest = function(address, country) {
      return resourceService.ajax({
        url: '/fulltext/search',
        data: {
          q: address,
          suggest: true,
          country: country || 'DE',
          format: 'json'
        }
      });
    };

  }
});
