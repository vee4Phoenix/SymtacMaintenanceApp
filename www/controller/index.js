'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('IndexCtrl', [ '$scope', 'Constants', 'LoginFactory', 'PluginFactory', function($scope, Constants, LoginFactory, PluginFactory)
  {
    var controller = this;
    controller.loginDTO = LoginFactory.loginDTO;
    
    controller.onSubmit = function() {
      // show loading dialog
      $scope.$emit(Constants.ShowLoading);

      LoginFactory.login(loginSuccess, loginFailure);
      
      function loginSuccess(response) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);

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