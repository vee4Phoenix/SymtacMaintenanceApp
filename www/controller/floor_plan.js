'use strict';

(function() {
  var app = angular.module('App');  

  app.controller('FloorPlanCtrl', [ '$scope', 'FloorPlanFactory', 'CacheFactory', function($scope, FloorPlanFactory, CacheFactory)
  {
    var controller = this;
    controller.floorDTO = CacheFactory.floorDTO;
    
  }]);
})();