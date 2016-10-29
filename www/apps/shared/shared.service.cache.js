(function () {
  'use strict';
 
  angular
    .module('Shared')
    .factory('CacheFactory', CacheFactory);
 
  function CacheFactory() {
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
  }
  
})();