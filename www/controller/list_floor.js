'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('ListFloorCtrl', [ '$scope', 'Constants', 'FloorFactory', 'GlobalFactory', 'PluginFactory', 'CacheFactory', function($scope, Constants, FloorFactory, GlobalFactory, PluginFactory, CacheFactory)
  {
    var controller = this;
    
    controller.floorsDTO = [];
    
    controller.onLoad = function() {
      // show loading dialog
      $scope.$emit(Constants.ShowLoading);
      
      FloorFactory.getFloors().then(getFloorsSuccess, getFloorsError);
      
      function getFloorsSuccess(response) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        
        if (response.error == 1) {
          PluginFactory.alert(response.message, null, 'Error');
        } else {
          controller.floorsDTO = response.data.floorplans;
        }
      }
      
      function getFloorsError(err) {
        console.log('Error ' + err);
      }
    };
    
    controller.onFloorSelected = function(floor) {
      CacheFactory.floorDTO = floor;
      GlobalFactory.setPath('/floorplan');
    }
    
    controller.onLoad();
    
  }]);
})();