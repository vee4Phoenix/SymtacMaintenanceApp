(function () {
  'use strict';
 
  angular
    .module('Main')
    .factory('LoginFactory', MainFactory);
 
  MainFactory.$inject = ['$q', 'WebServiceFactory', 'GlobalFactory', 'Constants'];
 
  function MainFactory($q, WebServiceFactory, GlobalFactory, Constants)
  {
    return {
      loginDTO : {
        //username : 'contractor1@cirtsystems.ga',
        //password : 'password'
        username : '',
        password : ''
      },
 
      forgotDTO : {
        username : '',
        password : ''
      },
      
      
      login : function() {
        if (Constants.Debug) {
          console.log('Invoking LoginFactory.login...');
        }
        
        var q = $q.defer();
        
        // send the request
        var request = GlobalFactory.getAppToken();
        request.data = new Object();
        request.data.contractor = this.loginDTO;
        WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/contractor', request, onSuccess, onError);
        
        function onSuccess(response) { q.resolve(response); }
        function onError(e)  { q.reject(e); }
        
        return q.promise;

      },
      
      
      logout : function(successCallback, errorCallback) {
        if (Constants.Debug) {
          console.log('Invoking LoginFactory.logout...');
        }
        
        // send the request
        //WebServiceFactory.sendJSONGetRequest(Constants.WebServiceURL + '/logout', this.loginDTO, successCallback, errorCallback);
      },
 
      forgotPassword : function() {
        if (Constants.Debug) {
          console.log('Invoking LoginFactory.forgotPassword...');
        }
        
        var q = $q.defer();
        
        // send the request
        var request = GlobalFactory.getAppToken();
        request.data = this.forgotDTO
        WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/password', request, onSuccess, onError);
        
        function onSuccess(response) { q.resolve(response); }
        function onError(e)  { q.reject(e); }
        
        return q.promise;
      },
 
      sendNotificationToken : function(token, contractor_id, platform) {
        if (Constants.Debug) {
          console.log('Invoking LoginFactory.sendNotificationToken...');
        }
        
        var q = $q.defer();
        
        var request = GlobalFactory.getAppToken();
        request.data = new Object();
        request.data.contractor_id = contractor_id;

        if (platform == 'iOS') {
          request.data.ios_token = token;
        }
        else if (platform == 'Android') {
          request.data.android_token = token;
        }
 
        WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/pushtoken', request, onSuccess, onError);
        
        function onSuccess(response) { q.resolve(response); }
        function onError(e)  { q.reject(e); }
        
        return q.promise;
      }
    };
  }
 
})();
