(function () {
  'use strict';

  angular
    .module('Building')
    .config(BuildingRoute);
 
  BuildingRoute.$inject = ['$routeProvider', '$provide', 'BuildingConstants'];
  
  function BuildingRoute($routeProvider, $provide, BuildingConstants) {
  
    $routeProvider
    
      // list building page
      .when(BuildingConstants.PATH_BUILDING_LIST, {
        templateUrl  : 'apps/components/building/building.view.list.html',
        controller   : 'ListBuildingCtrl',
        controllerAs : 'controller'
      });
          
  }

})();
