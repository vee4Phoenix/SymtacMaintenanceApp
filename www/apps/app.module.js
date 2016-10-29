(function () {
  'use strict';
 
  angular.module('Shared', []);
  angular.module('Main', []);
  angular.module('Building', []);
  angular.module('Floor', []);
  angular.module('FloorPlan', []);
  angular.module('App', [ 'ngRoute', 'ngSanitize', 'Shared', 'Main', 'Building', 'Floor', 'FloorPlan' ]);

})();    // end of Master class definition
