'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('ListBuildingCtrl', [ '$scope', 'Constants', 'BuildingFactory', 'GlobalFactory', 'CacheFactory', 'PluginFactory', function($scope, Constants, BuildingFactory, GlobalFactory, CacheFactory, PluginFactory)
  {
    var controller = this;
    
    controller.buildingsDTO = [];
    
    controller.onLoad = function() {
      // show loading dialog
      $scope.$emit(Constants.ShowLoading);
      
      BuildingFactory.getBuildings().then(getBuildingsSuccess, getBuildingsError);
      
      function getBuildingsSuccess(response) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        
        if (response.error == 1) {
          PluginFactory.alert(response.message, null, 'Error');
        } else {
          controller.buildingsDTO = response.data.buildings;
        }
      }
      
      function getBuildingsError(err) {
        console.log('Error ' + err);
      }
    };
    
    controller.onBuildingSelected = function(building) {
      CacheFactory.buildingDTO = building;
      GlobalFactory.setPath('/floor');
    }
    
    controller.onLoad();
    
  }]);
})();