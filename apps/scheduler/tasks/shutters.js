/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Task that open and close my shutters
 * @author: ltoinel@free.fr
 */

var request = require('request');
var CronJob = require('cron').CronJob;
	
//Local require
var config = require('../config');

// Local config
config.shutters = {};

// Close
config.shutters.close = {};
config.shutters.close.hour = '00 30 21 * * *';
config.shutters.close.url =  'http://192.168.1.4/down';

// Open
config.shutters.open = {};
config.shutters.open.hour = '00 00 9 * * *';
config.shutters.open.url = 'http://192.168.1.4/up';

/**
 * Open the shutters
 */ 
var job = new CronJob(config.shutters.open.hour, function(){

	if (config.enabled){
		console.log("Opening the shutters");
		request.get(config.shutters.open.url);
	};
	
  }, function () {
	  
		if (config.enabled){
			console.log('Shutters are open');
		};
  },
  false,
  config.timezone 
).start();


/**
 * Close the shutters
 */
var job = new CronJob(config.shutters.close.hour, function(){
	
	if (config.enabled){
		console.log("Closing the shutters");
		request.get(config.shutters.close.url);
	};
	
  }, function () {
		if (config.enabled){
			console.log('Shutters are closed');
		};
  },
  false,
  config.timezone 
).start();
