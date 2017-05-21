(function () {
  'use strict';
 
  angular
    .module('Shared')
    .factory('PluginFactory', PluginFactory);
 
  PluginFactory.$inject = ['$q', 'Constants', 'CordovaReady', 'LoginFactory', 'CacheFactory'];
 
  function PluginFactory($q, Constants, CordovaReady, LoginFactory, CacheFactory) {
    return {
      /*
       * Replacing browser alert,
       * Requires cordova-plugin-dialogs
       */      
      alert : CordovaReady(function (message, alertCallback, title, buttonName) {
        navigator.notification.alert(message, alertCallback, title, buttonName);
      }),
      
      confirm : CordovaReady(function (message, alertCallback, title, buttonLabels) {
        navigator.notification.confirm(message, alertCallback, title, buttonLabels);
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
      
      showCamera : CordovaReady(function(options) {
        if (Constants.Debug) {
          console.log('Invoking PluginFactory.showCamera...');
        }
        
        var q = $q.defer();
        
        navigator.camera.getPicture(onSuccess, onError, options);
        
        function onSuccess(imageData) { q.resolve(imageData); }
        function onError(e)  { q.reject(e); }
        
        return q.promise;
      }),
 
      getDevicePlatform : CordovaReady(function() {
        return device.platform;
      }),
 
      /*
       * Push Notifications
       * https://www.npmjs.com/package/cordova-push-notifications
       */
 
      registerPushNotification : CordovaReady(function() {
        if (Constants.Debug) {
          console.log('Invoking PluginFactory.registerPushNotification...');
          console.log(device.platform);
        }
        
        var q = $q.defer();
        
        var pushNotification = window.plugins.pushNotification;
        
        if (device.platform == 'Android') {
          pushNotification.register(successHandler, errorHandler, {
            "senderID":"597226893358",
            "ecb":"PluginFactory.onNotification"
          });
        }
        else if (device.platform == 'iOS') {
          pushNotification.register(tokenHandler, errorHandler, {
            "badge":"true",
            "sound":"true",
            "alert":"true",
            "ecb":"PluginFactory.onNotificationAPN"
          });
        }
        
        function successHandler (result) { q.resolve(); }
        function tokenHandler (result) { q.resolve(result); }
        function errorHandler (error) { q.reject(error); }
        
        return q.promise;
      }),
 
 
      //sendNotificationToken : CordovaReady(function(request) {
      //}),
 
 
      onNotification : CordovaReady(function(e) {
        // https://github.com/appfeel/cordova-push-notifications/blob/master/Example/www/index.html
        
        switch (e.event) {
          case 'registered':
            if (e.regid.length > 0) {
              //console.log('Registration ID: ' + e.regid);
              LoginFactory.sendNotificationToken(e.regid, CacheFactory.contractorDTO.id, device.platform)
              .then(onRegisterNotificationTokenSuccess, pushNotificationError);
              
              function onRegisterNotificationTokenSuccess(result) {
                console.log('Successfully registered notification token.');
              }
            
              function pushNotificationError(error) {
                navigator.notification.alert(error, null, 'Notification Error');
              }
            }
            break;
          case 'message':
            //PluginFactory.alert(e.payload.message, null, 'Notification');
            break;
          case 'error':
            //PluginFactory.alert(e.msg, null, 'Notification Error');
            break;
          default:
            console.log('Received unknown notification event');
            break;
        }
      }),
 
 
      onNotificationAPN : CordovaReady(function(e) {
        /*
        if (e.alert) {
          PluginFactory.alert(e.alert, null, 'Notification');
        }
        
        if (e.sound) {
        }
        
        if (e.badge) {
          window.plugins.pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
          
          function successHandler (result) {
            console.log(result);
          }
        }
        */
      })
    };
  }

})();
