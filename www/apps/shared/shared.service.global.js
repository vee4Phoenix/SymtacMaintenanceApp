(function () {
  'use strict';
 
  angular
    .module('Shared')
    .factory('GlobalFactory', GlobalFactory);
 
  GlobalFactory.$inject = ['$location', '$filter', 'PluginFactory'];
 
  function GlobalFactory($location, $filter, PluginFactory)
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
  }
 
})();
