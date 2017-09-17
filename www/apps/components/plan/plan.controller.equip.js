(function() {
  'use strict';
 
  angular
    .module('FloorPlan')
    .controller('EquipCtrl', EquipController);
 
  EquipController.$inject = ['$scope', '$sce', 'CacheFactory', 'PluginFactory', 'GlobalFactory', 'FloorPlanFactory', 'Constants', 'FloorPlanConstants'];
 
  function EquipController($scope, $sce, CacheFactory, PluginFactory, GlobalFactory, FloorPlanFactory, Constants, FloorPlanConstants)
  {
    var controller = this;
    controller.equipDTO = CacheFactory.equipDTO;
    
    // trust the HTML, otherwise styling will be removed
    //controller.equipDTO.notes = $sce.trustAsHtml(controller.equipDTO.notes);
    
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
 
    controller.getLabel = function(isOK) {
      return FloorPlanFactory.getLabel(controller.equipDTO, isOK);
    }; // controller.getLabel
 
    controller.onAddPhotoSelected = function() {
      PluginFactory.confirm('Select photo source', onSourceSelected, 'Add Photo', ['Camera', 'Library']);
 
      function onSourceSelected(buttonIndex) {
        var options = {
          destinationType: Camera.DestinationType.DATA_URL,
          correctOrientation: true
        };
 
        switch (buttonIndex) {
          case 1:
            options.sourceType = Camera.PictureSourceType.CAMERA;
            break;
          case 2:
            options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            break;
        }
 
        PluginFactory.showCamera(options).then(getPhotoSuccess, getPhotoError);
      } // onSourceSelected
 
      function getPhotoError(e) {
        PluginFactory.alert(e, null, 'Error');
      } // getPhotoError
 
      function getPhotoSuccess(imageData) {
        controller.equipDTO.extra_image = 'data:image/png;base64,' + imageData;
      } // getPhotoSuccess
    }; // controller.onAddPhotoSelected
 
    controller.onDeletePhotoSelected = function() {
      controller.equipDTO.extra_image = null;
    };
 
    controller.onCameraIconClicked = function(photo) {
      CacheFactory.photoDTO = photo;
      GlobalFactory.setPath(FloorPlanConstants.PATH_PHOTO);
    };
 
    controller.getAbsoluteLink = function(link) {
      return Constants.ImageURL + link;
    };
 
    controller.onload();
  }
})();
