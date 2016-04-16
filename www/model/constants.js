  'use strict';

  (function () {
    var app = angular.module('App');  
    
    app.constant('Constants', {
      'Debug' : true,
      
      // scope emit constants
      'ShowLoading' : 'ShowLoading',
      'HideLoading' : 'HideLoading',
      'UpdateTitle' : 'UpdateTitle',
      
      'WebServiceURL' : 'http://cirt.itchycat.com.au/api',
      
      // Equipment statuses
      'Due' : 0,
      'Normal' : 1,
      'Problem' : 2
    });

  })();