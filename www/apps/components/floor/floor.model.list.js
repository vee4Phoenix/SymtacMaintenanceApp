(function () {
  'use strict';
 
  angular
    .module('Floor')
    .factory('FloorFactory', FloorFactory);
 
  FloorFactory.$inject = ['$q', 'WebServiceFactory', 'GlobalFactory', 'CacheFactory', 'Constants'];
 
  function FloorFactory($q, WebServiceFactory, GlobalFactory, CacheFactory, Constants)
  {
    return {
      getFloors : function() {
        if (Constants.Debug) {
          console.log('Invoking FloorFactory.getFloors...');
        }
        
        var q = $q.defer();
        
        // send the request
        var request = GlobalFactory.getAppToken();
        request.data = new Object();
        request.data.building = CacheFactory.buildingDTO.id;
        request.data.contractor = CacheFactory.contractorDTO.id;
        
        WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/floorplans', request, onSuccess, onError);
        
        function onSuccess(response) { q.resolve(response); }
        function onError(e)  { q.reject(e); }
        
        return q.promise;
      }
    };
  }
 
})();