(function () {
  'use strict';
 
  angular
    .module('Shared')
    .constant('Constants', {
    
    'Debug' : true,
    
    // Storage
    'Username' : 'Username',
    
    // scope emit constants
    'ShowLoading'    : 'ShowLoading',
    'HideLoading'    : 'HideLoading',
    'UpdateTitle'    : 'UpdateTitle',
    
    'WebServiceURL' : 'http://cirtsystems.ga/api'
    
  });

})();