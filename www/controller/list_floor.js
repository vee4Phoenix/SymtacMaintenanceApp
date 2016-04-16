'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('ListFloorCtrl', [ '$scope', 'Constants', 'FloorFactory', 'GlobalFactory', 'PluginFactory', 'CacheFactory', function($scope, Constants, FloorFactory, GlobalFactory, PluginFactory, CacheFactory)
  {
    var controller = this;
    
    controller.floorsDTO = [];
    
    controller.onLoad = function() {
    
      $scope.$emit(Constants.UpdateTitle, 'Floor');
    
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
      } // getFloorsSuccess
      
      function getFloorsError(err) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        PluginFactory.alert(JSON.stringify(err), null, 'Error');
      } // getFloorsError
    }; // controller.onLoad
    
    controller.onFloorSelected = function(floor) {
      CacheFactory.floorDTO = floor;
      GlobalFactory.setPath('/floorplan');
    }; // controller.onFloorSelected
    
    controller.onLoad();
    
  }]);
})();