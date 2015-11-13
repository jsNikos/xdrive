define(['text!login/login.html'], function(loginHtml){
  return LoginComponent;

  function LoginComponent(){
    this.template = loginHtml;
  }
});
