  'use strict';

  (function () {
    var app = angular.module('App');  
    
    app.constant('Constants', {
      'Debug' : true,
      'ShowLoading' : 'ShowLoading',
      'HideLoading' : 'HideLoading',
      
      'WebServiceURL' : 'http://cirt.itchycat.com.au/api'
    });

  })();