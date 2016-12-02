
(function() {
  'use strict';
 
  angular
    .module('Main')
    .controller('IndexCtrl', MainController);
 
  MainController.$inject = ['$scope', 'Constants', 'LoginFactory', 'GlobalFactory', 'PluginFactory', 'CacheFactory'];
 
  function MainController($scope, Constants, LoginFactory, GlobalFactory, PluginFactory, CacheFactory)
  {
    var controller = this;
    controller.loginDTO = LoginFactory.loginDTO;
    controller.loginDTO.username = window.localStorage.getItem(Constants.Username);
 
    controller.forgotDTO = LoginFactory.forgotDTO;
 
    controller.forgot = 0;
    
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
          window.localStorage.setItem(Constants.Username, controller.loginDTO.username);
          controller.loginDTO.password = '';
          
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
 
    controller.onForgotPassword = function() {
      if (controller.forgotDTO.username == '') {
        PluginFactory.alert('You have to enter your username.', null, 'Error');
      } else {
        // show loading dialog
        $scope.$emit(Constants.ShowLoading);
        LoginFactory.forgotPassword().then(forgotPasswordSuccess, forgotPasswordFailure);
      }
 
      function forgotPasswordSuccess(response) {
        $scope.$emit(Constants.HideLoading);
        controller.forgotDTO.username = '';
        controller.forgotDTO.password = '';
      }
 
      function forgotPasswordFailure(err) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        PluginFactory.alert(JSON.stringify(err), null, 'Error');
      } // loginFailure
    }; // controller.onForgotPassword
    
    $scope.$emit(Constants.UpdateTitle, 'Login');
  }
 
})();
