

  /*
   * A function to redefine external link click to open in device browser instead
   * Requires inappbrowser plugin
   */
   /*
  $(document).on('click.deviceBrowserLoader', 'a.external', function(e) {
    e.preventDefault();
    Plugin.openBrowser($(this).attr('href'));
  });
  */

'use strict';

(function() {
  var app = angular.module('App');
  
  app.controller('GlobalController', [ '$scope', '$location', 'Constants', function($scope, $location, Constants) 
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
  }]);
  
})();
