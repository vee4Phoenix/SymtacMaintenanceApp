#!/usr/bin/env node

module.exports = function(context) {
  // add your plugins to this list
  var pluginlist = [
    'com.contactpoint.custom',
    'cordova-plugin-dialogs',
    'cordova-plugin-network-information',
    'cordova-plugin-inappbrowser'
  ];

  // no need to configure below
  var sys = require('sys');
  var exec = require('child_process').exec;

  function puts(error, stdout, stderr) {
    sys.puts(stdout);
  }

  pluginlist.forEach(function(plug) {
    exec('cordova plugin add ' + plug, puts);
  });
};