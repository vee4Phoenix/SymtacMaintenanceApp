(function () {
  'use strict';

  angular
    .module('Shared')
    .directive('convertToNumber', ConvertToInt)
    .directive('convertToDouble', ConvertToDouble)
    .directive('convertToDate', ConvertToDate);
 
  function ConvertToInt() {
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
  }
 
 
  function ConvertToDouble() {
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
  }
 
 
  ConvertToDate.$inject = ['$filter'];
 
  function ConvertToDate($filter) {
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
  }
 

})();
