(function () {
  'use strict';
 
  angular
    .module('FloorPlan')
    .factory('FloorPlanFactory', FloorPlanFactory);
 
  FloorPlanFactory.$inject = ['$q', 'WebServiceFactory', 'GlobalFactory', 'CacheFactory', 'Constants', 'FloorPlanConstants'];
 
  function FloorPlanFactory($q, WebServiceFactory, GlobalFactory, CacheFactory, Constants, FloorPlanConstants)
  {
    return {
      getEquipments : function() {
        if (Constants.Debug) {
          console.log('Invoking FloorPlanFactory.getEquipments...');
        }
        
        var q = $q.defer();
        
        // send the request
        var request = GlobalFactory.getAppToken();
        request.data = new Object();
        request.data.floorplan = CacheFactory.floorDTO.id;
        request.data.contractor = CacheFactory.contractorDTO.id;
        
        WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/equipments', request, onSuccess, onError);
        
        function onSuccess(response) { q.resolve(response); }
        function onError(e)  { q.reject(e); }
        
        return q.promise;
      },
      
      setEquipmentGroup : function(equip) {
        switch (equip.type_id) {
            case FloorPlanConstants.BREAK:
            case FloorPlanConstants.DRY_EXT:
            case FloorPlanConstants.PHONE:
            case FloorPlanConstants.EXIT:
            case FloorPlanConstants.FIRE_HOSE:
            case FloorPlanConstants.FIRST_AID:
            case FloorPlanConstants.SPANNER:
              equip.group = 0;
              break;
            case FloorPlanConstants.EWIS:
              equip.group = 1;
              break;
            case FloorPlanConstants.FIP:
            case FloorPlanConstants.FIRE_BLANKET:
            case FloorPlanConstants.SWITCHBOARD:
              equip.group = 2;
              break;
            default:
              equip.group = 0;
              break;                
          }
      },
      
      updateEquipment : function() {
        if (Constants.Debug) {
          console.log('Invoking FloorPlanFactory.updateEquipment...');
        }
        
        var q = $q.defer();
        
        // send the request
        var request = GlobalFactory.getAppToken();
        request.data = new Object();
        request.data.equipment = CacheFactory.equipDTO;
        request.data.contractor_id = CacheFactory.contractorDTO.id;
        
        WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/equipment', request, onSuccess, onError);
        
        function onSuccess(response) { q.resolve(response); }
        function onError(e)  { q.reject(e); }
        
        return q.promise;
      }
    };
  }
})();