  /*
   * All business logic should occur in this file
   * Ideally, controllers can invoke all business logic from this file and
   * simply need to render the result to the view
   */
  'use strict';

  (function () {
    var app = angular.module('App');  
    
    
    app.factory('GlobalFactory', [ '$location', '$filter', 'PluginFactory', function($location, $filter, PluginFactory) 
    {
      return {
        getAppToken: function() {
          var token = new Object();
          token.key = 'Symantec4pp';
          token.username = 'ios';
          token.password = 'iospassword';
          return token;
        },
        
        handleError : function(response) {
          if      (response.logout ) { $location.path('/'); }
          else if (response.message) { PluginFactory.alert(response.message, null, 'Error'); }
        },
        
        setPath : function(path) { $location.path(path); },
        
        getCurrentDate : function() { return $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'); },
        
        /**
         * Media Queries functions
         */
        
        isPhone   : function() { return window.matchMedia('screen and (max-width: 599px) and (orientation: portrait)').matches ||
                                        window.matchMedia('screen and (max-height: 599px) and (orientation: landscape)').matches; },
        isPhablet : function() { return window.matchMedia('screen and (min-width: 600px) and (max-width: 767px)').matches;        },
        isTablet  : function() { return window.matchMedia('screen and (min-width: 768px) and (max-width: 1023px)').matches;       },
        isDesktop : function() { return window.matchMedia('screen and (min-width: 1024px)').matches;                              },
        isRetina  : function() { return window.matchMedia('screen and (-webkit-min-device-pixel-ratio: 2)').matches;              }
        
      };
    }]); // app.factory('GlobalFactory')
    
    
    app.factory('CacheFactory', function() {
      return {
        contractorDTO : { },
        //{ "id":"1", "email":"contractor1@cirt.itchycat.com.au", "status":"1", "created_at":"0", "updated_at":"0", "first_name":"", "last_name":"", "company_name":"", "company_address":"", "mobile":"", "role":"10" }
        buildingDTO : { },
        // {"id":"1", "name":"Building 1", "address":"Building 1 address", "description":"this is Building 1", "type":null, "year":"2001", "floor_number":"2", "description_of_building":null, "inspections_start_date":null, "status":"1" }
        floorDTO : { },
        // {"id":"1", "building_id":"1", "name":"floor plan 1", "image":"http://cirt.itchycat.com.au/images/floorplans/sovereign_evac_maps-1.png"}
        equipDTO : { }
        // {"id":"1", "floorplan_id":"1", "name":"Equipment 1", "type_id":"1", "description":"Equipment 1", "inspection_frequency":"2", "x_axis":"100", "y_axis":"100", "last_inspection":"2016-03-17", "next_inspection":"2016-03-24", "image_width":"4960", "image_height":"3472"}
      };
    }); // app.factory('CacheFactory')
   
   
    app.factory('LoginFactory', [ '$q', 'WebServiceFactory', 'GlobalFactory', 'Constants', function($q, WebServiceFactory, GlobalFactory, Constants)
    {
      return {
        loginDTO : {
          username : 'contractor1@cirtsystems.ga',
          password : 'password'
        },
        
        
        login : function(successCallback, errorCallback) {
          if (Constants.Debug) {
            console.log('Invoking LoginFactory.login...');
          }
          
          var q = $q.defer();
          
          // send the request
          var request = GlobalFactory.getAppToken();
          request.data = new Object();
          request.data.contractor = this.loginDTO;
          WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/contractor', request, onSuccess, onError);
          
          function onSuccess(response) { q.resolve(response); }
          function onError(e)  { q.reject(e); }
          
          return q.promise;

        },
        
        
        logout : function(successCallback, errorCallback) {
          if (Constants.Debug) {
            console.log('Invoking LoginFactory.logout...');
          }
          
          // send the request
          //WebServiceFactory.sendJSONGetRequest(Constants.WebServiceURL + '/logout', this.loginDTO, successCallback, errorCallback);
        }
      };
    }]); // app.factory('LoginFactory')
   
    app.factory('BuildingFactory', [ '$q', 'WebServiceFactory', 'GlobalFactory', 'CacheFactory', 'Constants', function($q, WebServiceFactory, GlobalFactory, CacheFactory, Constants)
    {
      return {
        getBuildings : function() {
          if (Constants.Debug) {
            console.log('Invoking BuildingFactory.getBuildings...');
          }
          
          var q = $q.defer();
          
          // send the request
          var request = GlobalFactory.getAppToken();
          request.data = new Object();
          request.data.contractor = CacheFactory.contractorDTO.id;
          
          WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/buildings', request, onSuccess, onError);
          
          function onSuccess(response) { q.resolve(response); }
          function onError(e)  { q.reject(e); }
          
          return q.promise;
        }
      };
    }]); // app.factory('BuildingFactory')
   
    app.factory('FloorFactory', [ '$q', 'WebServiceFactory', 'GlobalFactory', 'CacheFactory', 'Constants', function($q, WebServiceFactory, GlobalFactory, CacheFactory, Constants)
    {
      return {
        getFloors : function() {
          if (Constants.Debug) {
            console.log('Invoking FloorFactory.getFloors...');
          }
          
          var q = $q.defer();
          
          // send the request
          var request = GlobalFactory.getAppToken();
          request.data = new Object();
          request.data.building = CacheFactory.buildingDTO.id;
          
          WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/floorplans', request, onSuccess, onError);
          
          function onSuccess(response) { q.resolve(response); }
          function onError(e)  { q.reject(e); }
          
          return q.promise;
        }
      };
    }]); // app.factory('FloorFactory')
   
    app.factory('FloorPlanFactory', [ '$q', 'WebServiceFactory', 'GlobalFactory', 'CacheFactory', 'Constants', function($q, WebServiceFactory, GlobalFactory, CacheFactory, Constants)
    {
      return {
        getEquipments : function() {
          if (Constants.Debug) {
            console.log('Invoking FloorPlanFactory.getEquipments...');
          }
          
          var q = $q.defer();
          
          // send the request
          var request = GlobalFactory.getAppToken();
          request.data = new Object();
          request.data.floorplan = CacheFactory.floorDTO.id;
          request.data.contractor = CacheFactory.contractorDTO.id;
          
          WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/equipments', request, onSuccess, onError);
          
          function onSuccess(response) { q.resolve(response); }
          function onError(e)  { q.reject(e); }
          
          return q.promise;
        },
        
        setEquipmentGroup : function(equip) {
          switch (equip.type_id) {
              case Constants.BREAK:
              case Constants.DRY_EXT:
              case Constants.PHONE:
              case Constants.EXIT:
              case Constants.FIRE_HOSE:
              case Constants.FIRST_AID:
              case Constants.SPANNER:
                equip.group = 0;
                break;
              case Constants.EWIS:
                equip.group = 1;
                break;
              case Constants.FIP:
              case Constants.FIRE_BLANKET:
              case Constants.SWITCHBOARD:
                equip.group = 2;
                break;
              default:
                equip.group = 0;
                break;                
            }
        },
        
        updateEquipment : function() {
          if (Constants.Debug) {
            console.log('Invoking FloorPlanFactory.updateEquipment...');
          }
          
          var q = $q.defer();
          
          // send the request
          var request = GlobalFactory.getAppToken();
          request.data = new Object();
          request.data.equipment = CacheFactory.equipDTO;
          
          WebServiceFactory.sendJSONPostRequest(Constants.WebServiceURL + '/equipment', request, onSuccess, onError);
          
          function onSuccess(response) { q.resolve(response); }
          function onError(e)  { q.reject(e); }
          
          return q.promise;
        }
      };
    }]); // app.factory('FloorPlanFactory')
    
  })();