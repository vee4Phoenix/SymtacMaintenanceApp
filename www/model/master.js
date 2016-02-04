  'use strict';
  
  (function () {
  
    var app = angular.module('App', [ 'ngRoute' ]);
  
    app.config(function($routeProvider, $provide) {
    
      $routeProvider
      
        // home page
        .when('/', {
          templateUrl : 'view/index.html',
          controller : 'IndexCtrl',
          controllerAs : 'controller'
        })
               
        .otherwise({
          redirectTo: '/'
        });
            
    });
    
    app.directive('convertToNumber', function() {
      return {
        require : 'ngModel',
        restrict : 'A',
        link: function(scope, element, attrs, ngModel) {
          ngModel.$parsers.push(function(val) {
            return parseInt(val, 10) || 0;
          });
          ngModel.$formatters.push(function (val) {
            return '' + val;
          });
        }
      };
    });
    
    app.directive('convertToDouble', function() {
      return {
        require : 'ngModel',
        restrict : 'A',
        link: function(scope, element, attrs, ngModel) {
          ngModel.$parsers.push(function(val) {
            return parseFloat(val, 10) || 0;
          });
          ngModel.$formatters.push(function (val) {
            return '' + val;
          });
        }
      };
    });
    
    app.directive('convertToDate', [ '$filter', function($filter) {
      return {
        require : 'ngModel',
        restrict : 'A',
        link: function(scope, element, attrs, ngModel) {
          ngModel.$parsers.push(function(val) {
            return $filter('date')(val, 'yyyy-MM-dd');
          });
          ngModel.$formatters.push(function (val) {
            return new Date(val);
          });
        }
      };
    }]);
    
    app.directive('booleanToNumber', function() {
      return {
        require : 'ngModel',
        restrict : 'A',
        link: function(scope, element, attrs, ngModel) {
          ngModel.$parsers.push(function(val) {
            return val ? 1 : 0;
          });
          ngModel.$formatters.push(function (val) {
            return val == 1;
          });
        }
      };
    });
    
    app.filter('secondsToHours', function() {
      return function(input) {
        function z(n) { return (n < 10 ? '0' : '') + n; }
        var seconds = input % 60;
        var minutes = Math.floor(input % 3600 / 60);
        var hours = Math.floor(input / 3600);
        return (z(hours) + ':' + z(minutes) + ':' + z(seconds));
      };
    });

  })();    // end of Master class definition
