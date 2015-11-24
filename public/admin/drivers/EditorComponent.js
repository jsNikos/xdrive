define(['text!drivers/editor.html', 'resourceService', 'jquery'], function(editorHtml, resourceService, jquery) {
  return EditorComponent;

  function EditorComponent() {
    this.template = editorHtml;
    this.data = function() {
      return {
        errors: undefined
      }
    };
    this.props = ['driver', 'isEditing'];
    this.methods = this;
    this.replace = false;

    this.handleCancel = function() {
      removeContent(this.$el);
      this.$dispatch('cancel-edit');
    };

    this.handleCreate = function(driver) {
      var vueScope = this;
      resourceService.fetch({
          url: '/api/driver/addDriver',
          method: 'POST',
          data: {
            driver: driver
          }
        })
        .then(function(resp) {
          if (resp.errors) {
            vueScope.$set('errors', resp.errors);
          } else {
            removeContent(vueScope.$el);
            vueScope.$dispatch('added-driver', _.extend(driver, resp));
          }
        })
        .catch(console.log);
    }

    this.handleUpdate = function(driver) {
      var vueScope = this;
      resourceService.fetch({
          url: '/api/driver/updateDriver',
          method: 'POST',
          data: {
            driver: driver
          }
        })
        .then(function(resp) {
          if (resp.errors) {
            vueScope.$set('errors', resp.errors);
          } else {
            removeContent(vueScope.$el);
            vueScope.$dispatch('updated-driver', driver);
          }
        })
        .catch(console.log);
    };

    this.handleRemove = function(driver) {
      removeContent(this.$el);
      this.$dispatch('remove', driver);
    }

    function removeContent(el){
      jquery(el).empty();
    }
  }
});
