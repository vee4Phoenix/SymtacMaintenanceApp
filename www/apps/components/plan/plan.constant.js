(function () {
  'use strict';

  angular
    .module('FloorPlan')
    .constant('FloorPlanConstants', {
    
      // Floor Plan constants
      PATH_FLOOR_PLAN : '/floorplan',
      PATH_EQUIPMENT : '/equip',
            
      // Equipment type
      BREAK        : '1',
      DRY_EXT      : '2',
      PHONE        : '3',
      EXIT         : '4',
      FIRE_HOSE    : '5',
      FIRST_AID    : '6',
      SPANNER      : '7',
      EWIS         : '8',
      FIP          : '9',
      FIRE_BLANKET : '10',
      SWITCHBOARD  : '11'
      
    });

})();
