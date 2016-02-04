module.exports = {
  /*
  getWorkList: function(callback, error) {
    cordova.exec(callback, error, 'Connector', 'getWorkList', []);
  }
  */

  setPreference: function(key, value, callback, error) {
    cordova.exec(callback, error, 'Connector', 'setPreference', [key, value]);
  },
  
  getPreference: function(key, callback, error) {
    cordova.exec(callback, error, 'Connector', 'getPreference', [key]);
  }
}