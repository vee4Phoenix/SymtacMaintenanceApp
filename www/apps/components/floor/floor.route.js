(function () {
  'use strict';

  angular
    .module('Floor')
    .config(FloorRoute);
 
  FloorRoute.$inject = ['$routeProvider', '$provide', 'FloorConstants'];
  
  function FloorRoute($routeProvider, $provide, FloorConstants) {
  
    $routeProvider
    
      // list floor page
      .when(FloorConstants.PATH_FLOOR_LIST, {
        templateUrl  : 'apps/components/floor/floor.view.list.html',
        controller   : 'ListFloorCtrl',
        controllerAs : 'controller'
      });
          
  }

})();
