'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('IndexCtrl', [ '$scope', 'Constants', 'LoginFactory', 'GlobalFactory', 'PluginFactory', 'CacheFactory', function($scope, Constants, LoginFactory, GlobalFactory, PluginFactory, CacheFactory)
  {
    var controller = this;
    controller.loginDTO = LoginFactory.loginDTO;
    
    controller.onSubmit = function() {
      // show loading dialog
      $scope.$emit(Constants.ShowLoading);

      LoginFactory.login().then(loginSuccess, loginFailure);
      
      function loginSuccess(response) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);

        if (response.error == 1) {
          PluginFactory.alert(response.message, null, 'Error');
        } else {
          CacheFactory.contractorDTO = response.data.contractor;
          GlobalFactory.setPath('/building');
        }
      } // loginSuccess
      
      function loginFailure(err) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        PluginFactory.alert(JSON.stringify(err), null, 'Error');
      } // loginFailure
    }; // controller.onSubmit
    
    $scope.$emit(Constants.UpdateTitle, 'Login');
    
  }]);
})();