(function () {
  'use strict';
 
  angular
    .module('Building')
    .factory('BuildingFactory', BuildingFactory);
 
  BuildingFactory.$inject = ['$q', 'WebServiceFactory', 'GlobalFactory', 'CacheFactory', 'Constants'];
 
  function BuildingFactory($q, WebServiceFactory, GlobalFactory, CacheFactory, Constants)
  {
    return {
      getBuildings : function() {
        if (Constants.Debug) {
          console.log('Invoking BuildingFactory.getBuildings...');
        }
        
        var q = $q.defer();
        
        // send the request
        var request = GlobalFactory.getAppToken();
        request.data = new Object();
        request.data.contractor = CacheFactory.contractorDTO.id;
        
        WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/buildings', request, onSuccess, onError);
        
        function onSuccess(response) { q.resolve(response); }
        function onError(e)  { q.reject(e); }
        
        return q.promise;
      }
    };
  }
 
})();