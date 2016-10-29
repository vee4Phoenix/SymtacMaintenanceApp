(function() {
  'use strict';
 
  angular
    .module('Building')
    .controller('ListBuildingCtrl', BuildingController);
 
  BuildingController.$inject = ['$scope', 'Constants', 'BuildingFactory', 'GlobalFactory', 'CacheFactory', 'PluginFactory'];
 
  function BuildingController($scope, Constants, BuildingFactory, GlobalFactory, CacheFactory, PluginFactory)
  {
    var controller = this;
    
    controller.buildingsDTO = [];
    
    controller.onLoad = function() {

      $scope.$emit(Constants.UpdateTitle, 'Building');
    
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
      } // getBuildingsSuccess
      
      function getBuildingsError(err) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        PluginFactory.alert(JSON.stringify(err), null, 'Error');
      } // getBuildingsError
    }; // controller.onLoad
    
    controller.onBuildingSelected = function(building) {
      CacheFactory.buildingDTO = building;
      GlobalFactory.setPath('/floor');
    }; // controller.onBuildingSelected
    
    controller.onLoad();
  }
 
})();