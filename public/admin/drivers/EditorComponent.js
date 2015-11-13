define(['text!drivers/editor.html'], function(editorHtml){
  return EditorComponent;

  function EditorComponent(){
    this.template = editorHtml;
    this.data = undefined;
    this.props = ['driver'];
    this.methods = {};
  }
});
