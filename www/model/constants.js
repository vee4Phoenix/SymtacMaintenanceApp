  'use strict';

  (function () {
    var app = angular.module('App');  
    
    app.constant('Constants', {
      'Debug' : true,
      
      // scope emit constants
      'ShowLoading'    : 'ShowLoading',
      'HideLoading'    : 'HideLoading',
      'UpdateTitle'    : 'UpdateTitle',
      
      'WebServiceURL' : 'http://cirt.itchycat.com.au/api',
      
      // Equipment statuses
      'Due'     : 0,
      'Normal'  : 1,
      'Problem' : 2,
      
      // Equipment type
      'BREAK'        : 1,
      'DRY_EXT'      : 2,
      'PHONE'        : 3,
      'EXIT'         : 4,
      'FIRE_HOSE'    : 5,
      'FIRST_AID'    : 6,
      'SPANNER'      : 7,
      'EWIS'         : 8,
      'FIP'          : 9,
      'FIRE_BLANKET' : 10,
      'SWITCHBOARD'  : 11
      
    });

  })();