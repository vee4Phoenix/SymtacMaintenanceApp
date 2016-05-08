'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('FloorPlanCtrl', [ '$scope', 'FloorPlanFactory', 'CacheFactory', 'PluginFactory', 'GlobalFactory', 'Constants', function($scope, FloorPlanFactory, CacheFactory, PluginFactory, GlobalFactory, Constants)
  {
    var controller = this;
    controller.floorDTO = CacheFactory.floorDTO;
    
    controller.equipsDTO = [];
    
    controller.onLoad = function() {
    
      $scope.$emit(Constants.UpdateTitle, 'Floor Plan');
    
      // show loading dialog
      $scope.$emit(Constants.ShowLoading);
      
      FloorPlanFactory.getEquipments().then(getEquipmentsSuccess, getEquipmentError);
      
      function getEquipmentsSuccess(response) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        
        if (response.error == 1) {
          PluginFactory.alert(response.message, null, 'Error');
        } else {
          for (var i = 0; i < response.data.equipments.length; i++) {
            FloorPlanFactory.setEquipmentStatus(response.data.equipments[i]);
            FloorPlanFactory.setEquipmentGroup(response.data.equipments[i]);
          }
          
          controller.equipsDTO = response.data.equipments;
        }
      } // getEquipmentsSuccess
      
      function getEquipmentError(err) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        PluginFactory.alert(JSON.stringify(err), null, 'Error');
      } // getEquipmentError
    }; // controller.onLoad
    
    controller.onEquipmentSelected = function(equip) {
      CacheFactory.equipDTO = equip;
      GlobalFactory.setPath('/equip');
    }; // controller.onEquipmentSelected
    
    controller.onLoad();
    
  }]);
})();