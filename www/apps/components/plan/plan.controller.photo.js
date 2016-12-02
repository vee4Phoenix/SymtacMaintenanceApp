(function() {
  'use strict';
 
  angular
    .module('FloorPlan')
    .controller('PhotoCtrl', PhotoController);
 
  PhotoController.$inject = ['$scope', 'CacheFactory', 'GlobalFactory', 'Constants'];
 
  function PhotoController($scope, CacheFactory, GlobalFactory, Constants)
  {
    var controller = this;
    controller.photoDTO = CacheFactory.photoDTO;
  }
})();
