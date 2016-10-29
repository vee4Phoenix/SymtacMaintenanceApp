(function () {
  'use strict';
 
  angular
    .module('Shared')
    .factory('PluginFactory', PluginFactory);
 
  PluginFactory.$inject = ['$q', 'Constants', 'CordovaReady'];
 
  function PluginFactory($q, Constants, CordovaReady) {
    return {
      /*
       * Replacing browser alert,
       * Requires cordova-plugin-dialogs
       */      
      alert : CordovaReady(function (message, alertCallback, title, buttonName) {
        navigator.notification.alert(message, alertCallback, title, buttonName);
      }),
      
      /*
       * Checks whether the device is online,
       * Requires cordova-plugin-network-information
       */
      isOnline : CordovaReady(function() {
        return navigator.network.connection.type != Connection.NONE;
      }), 
      
      /*
       * Opens a URL in a browser instead of inside the app
       * Requires cordova-plugin-inappbrowser
       */
      openBrowser : CordovaReady(function(url) {
        cordova.InAppBrowser.open(url, '_system');
      }),
      
      setClients : CordovaReady(function(clients) {
        if (Constants.Debug) {
          console.log('Invoking PluginFactory.setClients...');
        }
        
        var q = $q.defer();
        
        //cp_plugin.setClients(clients, onSuccess, onError);
        
        function onSuccess() { q.resolve(); }
        function onError(e)  { q.reject(e); }
        
        return q.promise;
      })
    };
  }

})();