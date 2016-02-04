  /*
   * All plugin function call should be done in this file
   * The idea is the app may need to switch to a different plugin in the future
   * when it happens, only this file will be affected
   */
  'use strict';

  (function () {
    var app = angular.module('App'); 
    
    /*
     * Ensure plugin calls happen after device ready
     */
    app.factory('CordovaReady', function() {
      return function(fn) {
        var queue = [];
        var impl = function() {
          queue.push(Array.prototype.slice.call(arguments));
        };
        
        document.addEventListener('deviceready', function() {
          queue.forEach(function (args) {
            fn.apply(this, args);
          });
          impl = fn;
        }, false);
        
        return function() {
          return impl.apply(this, arguments);
        };
      };
    }); // cordovaReady
    
    
    app.factory('PluginFactory', function($q, Constants, CordovaReady) {
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
    }); // PluginFactory

  })();