  /*
   * All business logic should occur in this file
   * Ideally, controllers can invoke all business logic from this file and
   * simply need to render the result to the view
   */
  'use strict';

  (function () {
    var app = angular.module('App');  
    
    
    app.factory('GlobalFactory', [ '$location', '$filter', 'PluginFactory', function($location, $filter, PluginFactory) 
    {
      return {
        getAppToken: function() {
          var token = new Object();
          token.key = 'Symantec4pp';
          token.username = 'ios';
          token.password = 'iospassword';
          return token;
        },
        
        handleError : function(response) {
          if      (response.logout ) { $location.path('/'); }
          else if (response.message) { PluginFactory.alert(response.message, null, 'Error'); }
        },
        
        setPath : function(path) { $location.path(path); },
        
        getCurrentDate : function() { return $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'); },
        
        /**
         * Media Queries functions
         */
        
        isPhone   : function() { return window.matchMedia('screen and (max-width: 599px) and (orientation: portrait)').matches ||
                                        window.matchMedia('screen and (max-height: 599px) and (orientation: landscape)').matches; },
        isPhablet : function() { return window.matchMedia('screen and (min-width: 600px) and (max-width: 767px)').matches;        },
        isTablet  : function() { return window.matchMedia('screen and (min-width: 768px) and (max-width: 1023px)').matches;       },
        isDesktop : function() { return window.matchMedia('screen and (min-width: 1024px)').matches;                              },
        isRetina  : function() { return window.matchMedia('screen and (-webkit-min-device-pixel-ratio: 2)').matches;              }
        
      };
    }]);
    
    
    app.factory('CacheFactory', ['$cacheFactory', function($cacheFactory) {
      return $cacheFactory('super-cache');
    }]);


    app.factory('LoginFactory', [ 'WebServiceFactory', 'GlobalFactory', 'Constants', function(WebServiceFactory, GlobalFactory, Constants)
    {
      return {
        loginDTO : {
          username : 'contractor1@cirt.itchycat.com.au',
          password : 'password'
        },
        
        
        login : function(successCallback, errorCallback) {
          if (Constants.Debug) {
            console.log('Invoking LoginFactory.login...');
          }
          
          // send the request
          var request = GlobalFactory.getAppToken();
          request.data = new Object();
          request.data.contractor = this.loginDTO;
          WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/contractor', request, successCallback, errorCallback);
        },
        
        
        logout : function(successCallback, errorCallback) {
          if (Constants.Debug) {
            console.log('Invoking LoginFactory.logout...');
          }
          
          // send the request
          //WebServiceFactory.sendJSONGetRequest(Constants.WebServiceURL + '/logout', this.loginDTO, successCallback, errorCallback);
        }
      };
    }]);
    
  })();