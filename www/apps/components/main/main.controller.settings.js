
(function() {
  'use strict';
 
  angular
    .module('Main')
    .controller('SettingsCtrl', SettingsController);
 
  SettingsController.$inject = ['$scope', 'Constants', 'LoginFactory', 'GlobalFactory', 'PluginFactory', 'CacheFactory'];
 
  function SettingsController($scope, Constants, LoginFactory, GlobalFactory, PluginFactory, CacheFactory)
  {
    var controller = this;
 
    controller.forgotDTO = LoginFactory.forgotDTO;
    controller.forgotDTO.username = window.localStorage.getItem(Constants.Username);
    controller.forgotDTO.password = '';
    controller.confirmPassword = '';
 
    controller.onUpdatePassword = function() {
      if (controller.forgotDTO.password == '') {
        PluginFactory.alert('You have to enter your new password.', null, 'Error');
      } else if (controller.forgotDTO.password != controller.confirmPassword) {
        PluginFactory.alert('New password does not match.', null, 'Error');
      } else {
        // show loading dialog
        $scope.$emit(Constants.ShowLoading);
        LoginFactory.forgotPassword().then(updatePasswordSuccess, updatePasswordFailure);
      }
 
      function updatePasswordSuccess(response) {
        $scope.$emit(Constants.HideLoading);
 
        if (response.error == 1) {
          PluginFactory.alert(response.message, null, 'Error');
        } else {
          controller.forgotDTO.username = '';
          controller.forgotDTO.password = '';
          controller.confirmPassword = '';
          PluginFactory.alert(response.message, null, 'Success');
        }
      }
 
      function updatePasswordFailure(err) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        PluginFactory.alert(JSON.stringify(err), null, 'Error');
      } // loginFailure
    }; // controller.onForgotPassword
    
    $scope.$emit(Constants.UpdateTitle, 'Settings');
  }
 
})();
