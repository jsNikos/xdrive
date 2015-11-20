define(['text!drivers/editor.html', 'resourceService'], function(editorHtml, resourceService) {
  return EditorComponent;

  function EditorComponent() {
    this.template = editorHtml;
    this.data = undefined;
    this.props = ['driver', 'isEditing'];
    this.methods = this;
    this.replace = false;

    this.handleCancel = function() {
      this.$dispatch('cancel-edit');
    };

    this.handleSubmit = function(driver) {
      var vueScope = this;
      resourceService.fetch({
          url: '/api/driver/addDriver',
          method: 'POST',
          data: {driver: driver}
        })
        .then(function(resp){
          if(resp.errors){
              vueScope.$set('errors', resp.errors);
          } else{
              vueScope.$dispatch('added-driver', driver);
          }
        })
        .catch(console.log);
    }

    this.handleRemove = function(driver) {
      this.$dispatch('remove', driver);
    }
  }
});
