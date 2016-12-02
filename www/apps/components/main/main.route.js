(function () {
  'use strict';

  angular
    .module('Main')
    .config(MainRoute);
 
  MainRoute.$inject = ['$routeProvider', '$provide', 'MainConstants'];
  
  function MainRoute($routeProvider, $provide, MainConstants) {
  
    $routeProvider
    
      // home page
      .when(MainConstants.PATH_MAIN, {
        templateUrl  : 'apps/components/main/main.view.index.html',
        controller   : 'IndexCtrl',
        controllerAs : 'controller'
      })
      
      .when(MainConstants.PATH_SETTINGS, {
        templateUrl  : 'apps/components/main/main.view.settings.html',
        controller   : 'SettingsCtrl',
        controllerAs : 'controller'
      })
 
      .otherwise({
        redirectTo: MainConstants.PATH_MAIN
      });
          
  }

})();
