define(['text!map/map.html'], function(mapHtml){
  return MapComponent;

  function MapComponent(){
    this.template = mapHtml;
    this.data = undefined;
    this.methods = {};
  }
});
