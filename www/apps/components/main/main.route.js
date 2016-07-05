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
      
      .otherwise({
        redirectTo: '/'
      });
          
  }

})();
