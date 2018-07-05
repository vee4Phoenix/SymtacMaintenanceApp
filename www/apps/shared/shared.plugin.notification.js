(function () {
  'use strict';

  angular
    .module('Plugin')
    .service('PluginNotificationService', PluginNotificationService);

  PluginNotificationService.$inject = ['CordovaReady', '$q', 'Constants', 'GlobalFactory', 'PluginPersistentFactory', 'APILayerFactory', 'PluginAlertFactory'];

  function PluginNotificationService(CordovaReady, $q, Constants, GlobalFactory, PluginPersistentFactory, APILayerFactory, PluginAlertFactory) {
    var factory = this;

    // Send / Receive push notification
    // Requires phonegap-plugin-push
    // https://github.com/phonegap/phonegap-plugin-push
    // http://macdonst.github.io/push-workshop/module1.html
    // Testing tool: https://github.com/onmyway133/PushNotifications/releases

    factory.registrationData = null;

    factory.init = CordovaReady(function() {
      var push = PushNotification.init({
        android: {

        },
        ios: {
          alert: true,
          badge: true,
          sound: false
        }
      });

      push.on('registration', function(data) { factory.onRegistration(data); });
      push.on('notification', function(data) { factory.onNotification(data); });
      push.on('error',        function(data) { factory.onError(data); });
    });


    factory.hasPermission = CordovaReady(function() {
      var deferred = $q.defer();
      var callback = function(data) { deferred.resolve(data.isEnabled); };
      PushNotification.hasPermission(callback);
      return deferred.promise;
    });


    factory.onRegistration = function(data) {
      factory.registrationData = data;
      PluginPersistentFactory.getPersistentString(Constants.KEY_PUSH_ID)
        .then(factory.onGetPersistentStringSuccess)
        .catch(GlobalFactory.onPluginError);
    };

    factory.onGetPersistentStringSuccess = function(registrationId) {
      if (registrationId == null || registrationId != factory.registrationData.registrationId) {
        APILayerFactory.registerForPushNotification(factory.registrationData.registrationId)
          .then(factory.onRegisterForPushNotificationSuccess)
          .catch(GlobalFactory.onAPIError);
      }
    };

    factory.onRegisterForPushNotificationSuccess = function(res) {
      if (!res.ServiceResult.Success) {
        throw res;
      } else {
        PluginPersistentFactory.setPersistentString(Constants.KEY_PUSH_ID, factory.registrationData.registrationId)
          .then(factory.onSetPersistentStringSuccess)
          .catch(GlobalFactory.onPluginError);
      }
    };

    factory.onSetPersistentStringSuccess = function(result) {
      // do nothing
      // TODO: remove this when API is up
      PluginAlertFactory.alert('Success', 'Your push notification token is ' + factory.registrationData.registrationId);
    };

    factory.onNotification = function(data) {
      console.log('PluginNotificationService onNotification called.');
      console.log(data);
      // var string = data.additionalData.foreground ? 'Foreground ' : 'Background ';
      // string += data.additionalData.coldstart ? 'Cold start ' : 'Hot start ';
      // string += data.title;
      // PluginAlertFactory.alert(string, data.message);
    };

    factory.onError = function(error) {
      console.log('PluginNotificationService onError called.');
      console.log(error);
    };
  }

})();
