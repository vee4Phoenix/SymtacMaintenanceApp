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
    
    'WebServiceURL' : 'https://www.cirtsystems.com.au/api',
    'ImageURL' : 'https://www.cirtsystems.com.au'
    
  });

})();
