/*
    Class: WebService

    Example for instantiating a class and calling a method:
        WebService.sendJSONGetRequest(url, callback, error);
*/
'use strict';

(function () {

  var app = angular.module('App');
    
  app.factory('WebServiceFactory', [ '$http', 'Constants', function($http, Constants) {
    // Use x-www-form-urlencoded Content-Type
    //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    /*
    var serialize = function(obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
      for(name in obj) {
        value = obj[name];
        
        // Array
        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += serialize(innerObj) + '&';
          }
        }
        
        // Object
        else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += serialize(innerObj) + '&';
          }
        }
        
        // Other type
        else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      } // for (name in obj)
      
      return query.length ? query.substr(0, query.length - 1) : query; // string the last '&'
    }; // serialize
    
    // Override $http service's default transformRequest
    $http.defaults.transformRequest = [function(data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? serialize(data) : data;
    }];
    */
    
    return {
      /*
       * Default Error function
       */
      defaultError : function(e) {
        console.log(JSON.stringify(e));
      },
      
      /*
       * Default Callback function
       */
      defaultCallback : function(response) {
        console.log(JSON.stringify(response));
      },
      
      /*
       * A function to send a JSON GET Request
       */
      sendJSONGetRequest : function(url, callback, error) {
        if (Constants.Debug) {
          console.log('Invoking WebServiceFactory.sendJSONGetRequest : ' + url);
        }
        
        error = error || this.defaultError;
        callback = callback || this.defaultCallback;
        
        $http.get(url).then(
          function(response) {
            if (Constants.Debug) {
              console.log('WebServiceFactory.sendJSONGetRequest response: ');
              console.log(JSON.stringify(response));
            }
            callback(response.data);
          }, 
          error
        );
      },
      
      /*
       * A function to send a JSON POST Request
       */
      sendJSONPostRequest : function(url, request, callback, error) {
        if (Constants.Debug) {
          console.log('Invoking WebServiceFactory.sendJSONPostRequest : ' + url);
          console.log('Param: ', JSON.stringify(request));
        }
        
        error = error || this.defaultError;
        callback = callback || this.defaultCallback;
        
        $http.post(url, request).then(
          function(response) {
            if (Constants.Debug) {
              console.log('WebServiceFactory.sendJSONPostRequest response: ');
              console.log(JSON.stringify(response));
            }
            callback(response.data);
          }, 
          error
        );
      },
      
      /*
       * A function to send a JSON PUT Request
       */
      sendJSONPutRequest : function(url, request, callback, error) {
        if (Constants.Debug) {
          console.log('Invoking WebServiceFactory.sendJSONPutRequest : ' + url);
          console.log('Param: ', JSON.stringify(request));
        }
        
        error = error || this.defaultError;
        callback = callback || this.defaultCallback;
        
        $http.put(url, request).then(
          function(response) {
            if (Constants.Debug) {
              console.log('WebServiceFactory.sendJSONPutRequest response: ');
              console.log(JSON.stringify(response));
            }
            callback(response.data);
          }, 
          error
        );
      },
      
      /*
       * A function to send a JSON DELETE Request
       */
      sendJSONDeleteRequest : function(url, callback, error) {
        if (Constants.Debug) {
          console.log('Invoking WebServiceFactory.sendJSONDeleteRequest : ' + url);
        }
        
        error = error || this.defaultError;
        callback = callback || this.defaultCallback;
        
        $http.delete(url).then(
          function(response) {
            if (Constants.Debug) {
              console.log('WebServiceFactory.sendJSONDeleteRequest response: ');
              console.log(JSON.stringify(response));
            }
            callback(response.data);
          }, 
          error
        );
      }
      
    };
  }]); // WebServiceFactory
/*
  this.WebService = this.WebService || {};
  var ns = this.WebService;

*/
  /*
   * A function to send soap request
   */
/*
  ns.sendSoapRequest = function(url, action, envelope, callback, error) {
    if (ns.Debug) {
      console.log('sendSoapRequest action: ' + action);
      console.log('sendSoapRequest envelope: ' + envelope);
    }

    error = error || ns.defaultError;
    callback = callback || ns.defaultCallback;

    $.support.cors = true;

    $.ajax({
      url: url,
      type: "POST",
      dataType: "xml",
      data: envelope,
      headers: {
        SOAPAction: action
      },
      processData: false,
      contentType: "text/xml; charset=\"utf-8\"",
    })
    .done(function(response) {
      if (ns.Debug) {
        console.log('sendSoapRequest response:');
        console.log(new XMLSerializer().serializeToString(response));
      }
      callback(response);
    })
    .fail(function(e) {
      error(e);
    });
  }; // sendSoapRequest
*/

})();