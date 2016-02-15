  'use strict';

  (function () {
    var app = angular.module('App');  
    
    app.constant('Constants', {
      'Debug' : true,
      'ShowLoading' : 'ShowLoading',
      'HideLoading' : 'HideLoading',
      
      'WebServiceURL' : 'http://cirt.harry2000.me/index.php?route=api'
    });

  })();