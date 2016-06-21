'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('EquipCtrl', [ '$scope', '$sce', 'CacheFactory', 'PluginFactory', 'FloorPlanFactory', 'Constants', function($scope, $sce, CacheFactory, PluginFactory, FloorPlanFactory, Constants)
  {
    var controller = this;
    controller.equipDTO = CacheFactory.equipDTO;
    
    // trust the HTML, otherwise styling will be removed
    controller.equipDTO.notes = $sce.trustAsHtml(controller.equipDTO.notes);
    
    controller.onload = function() {
      $scope.$emit(Constants.UpdateTitle, 'Equipment');
    }; // controller.onload
    
    controller.onSubmit = function() {

      // validation
      if (controller.equipDTO.status == 0) {
        PluginFactory.alert('Please select a status for the current equipment.', null, 'Error');
        return;
      }
      
      // show loading dialog
      $scope.$emit(Constants.ShowLoading);
      
      FloorPlanFactory.updateEquipment().then(updateEquipmentSuccess, updateEquipmentError);
      
      function updateEquipmentSuccess(response) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        
        if (response.error == 1) {
          PluginFactory.alert(response.message, null, 'Error');
        } else {
          PluginFactory.alert(response.message, function() {
            window.history.back();
          }, 'Success');
        }
      } // updateEquipmentSuccess
      
      function updateEquipmentError(err) {
        // hide loading dialog
        $scope.$emit(Constants.HideLoading);
        PluginFactory.alert(JSON.stringify(err), null, 'Error');
      } // updateEquipmentError
    }; // controller.onSubmit
    
    controller.onload();
  }]);
})();