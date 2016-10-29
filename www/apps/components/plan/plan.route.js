(function () {
  'use strict';

  angular
    .module('FloorPlan')
    .config(FloorPlanRoute);
 
  FloorPlanRoute.$inject = ['$routeProvider', '$provide', 'FloorPlanConstants'];
  
  function FloorPlanRoute($routeProvider, $provide, FloorPlanConstants) {
  
    $routeProvider
    
      // floor plan page
      .when(FloorPlanConstants.PATH_FLOOR_PLAN, {
        templateUrl  : 'apps/components/plan/plan.view.index.html',
        controller   : 'FloorPlanCtrl',
        controllerAs : 'controller'
      })
 
      // equip page
      .when(FloorPlanConstants.PATH_EQUIPMENT, {
        templateUrl  : 'apps/components/plan/plan.view.equip.html',
        controller   : 'EquipCtrl',
        controllerAs : 'controller'
      })
  }

})();
