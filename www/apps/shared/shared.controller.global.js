(function() {
  'use strict';
 
  angular
    .module('Shared')
    .controller('GlobalController', GlobalController);
 
  GlobalController.$inject = ['$scope', '$location', 'Constants', 'MainConstants', 'GlobalFactory'];
 
  function GlobalController($scope, $location, Constants, MainConstants, GlobalFactory)
  {
    var controller = this;
    
    // Loading dialog
    controller.isLoading = false;
    $scope.$on(Constants.ShowLoading, function() { controller.isLoading = true;  });
    $scope.$on(Constants.HideLoading, function() { controller.isLoading = false; });
    
    // Title
    controller.title = '';
    $scope.$on(Constants.UpdateTitle, function(e, title) { controller.title = title; });
    
    controller.onBack = function() {
      window.history.back();
    };
 
    controller.onSettings = function() {
      GlobalFactory.setPath(MainConstants.PATH_SETTINGS);
    };
    
    controller.isBackButtonVisible = function() {
      return $location.path() != MainConstants.PATH_MAIN;
    };
 
    controller.isSettingsButtonVisible = function() {
      return $location.path() != MainConstants.PATH_MAIN && $location.path() != MainConstants.PATH_SETTINGS;
    }; 
  }
  
})();
