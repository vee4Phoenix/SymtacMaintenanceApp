(function() {
  'use strict';
 
  angular
    .module('Shared')
    .controller('GlobalController', GlobalController);
 
  GlobalController.$inject = ['$scope', '$location', 'Constants'];
 
  function GlobalController($scope, $location, Constants) 
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
    
    controller.isBackButtonVisible = function() {
      return $location.path() != '/';
    }; 
  }
  
})();
