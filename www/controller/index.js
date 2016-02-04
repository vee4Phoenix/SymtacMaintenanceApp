'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('IndexCtrl', [ '$scope', 'LoginFactory', function($scope, LoginFactory)
  {
    var controller = this;
    controller.loginDTO = LoginFactory.loginDTO;
    
    controller.onSubmit = function() {
      LoginFactory.login(loginSuccess, loginFailure);
      
      function loginSuccess() {
        console.log('success');
      }
      
      function loginFailure() {
        console.log('failed');
      }
    };
    
  }]);
})();