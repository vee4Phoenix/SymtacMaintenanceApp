(function() {
  'use strict';
 
  angular
    .module('FloorPlan')
    .controller('PhotoCtrl', PhotoController);
 
  PhotoController.$inject = ['$scope', 'CacheFactory', 'GlobalFactory', 'Constants'];
 
  function PhotoController($scope, CacheFactory, GlobalFactory, Constants)
  {
    var controller = this;
    controller.photoDTO = Constants.ImageURL + CacheFactory.photoDTO + '?key=' + GlobalFactory.getAppToken().key;
 
    controller.onload = function() {
      $scope.$emit(Constants.UpdateTitle, 'Photo');
    }; // controller.onload
 
    controller.onload();
  }
})();
