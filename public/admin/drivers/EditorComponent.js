define(['text!drivers/editor.html'], function(editorHtml) {
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

    this.handleSubmit = function(driver){
      this.$dispatch('submit-edit', driver);
    }

    this.handleRemove = function(driver){
      this.$dispatch('remove', driver);
    }
  }
});
