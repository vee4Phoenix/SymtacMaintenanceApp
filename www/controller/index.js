'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('IndexCtrl', [ '$scope', 'LoginFactory', 'PluginFactory', function($scope, LoginFactory, PluginFactory)
  {
    var controller = this;
    controller.loginDTO = LoginFactory.loginDTO;
    
    controller.onSubmit = function() {
      LoginFactory.login(loginSuccess, loginFailure);
      
      function loginSuccess(response) {
        if (response.error == 1) {
          PluginFactory.alert(response.message, null, 'Error');
        } else {
          PluginFactory.alert(response.message, null, 'Success');
        }
      }
      
      function loginFailure() {
        console.log('failed');
      }
    };
    
  }]);
})();