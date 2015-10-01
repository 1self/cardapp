/*jslint node: true */
'use strict'
var request = require('request');

var create = function(requestOptions){
	var result = request(requestOptions);
	result.on('response', function(res) {
		// we don't want the main app cookie interferring with the cookies set on the card app
    	delete res.headers['set-cookie'];
	});

	return result;
};

exports.create = create;