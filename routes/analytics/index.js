var express = require('express');
var request = require('request');
var router = express.Router();

var setResponseLocals = function(req, res, next){
	res.locals.httpRequest = request;
	next();
};

var chooseAnalyticsEndpoint = function(req, res, next) {
	var url = '';

	if(req.session.token){
		url = req.app.locals.API_URL + 
		'/me/activity';
	} 
	else{
		url = req.app.locals.API_URL + '/anonymous/activity';
	}

	var requestOptions = {
		 url: url,
		 method: 'POST',
		 json: true,
		 headers: {
		   'Authorization': 'Bearer ' + req.session.token
		 },
		 body: req.body
	};

	res.locals.request = requestOptions;
	next();
};

var sendAnalytics = function(req, res, next) {
	res.locals.httpRequest(res.locals.request, function(error, httpResponse, body){
		res.send(200);
	});
};

// /analytics
router.post('',
	setResponseLocals,
	chooseAnalyticsEndpoint,
	sendAnalytics);

module.exports = router;
module.exports.chooseAnalyticsEndpoint = chooseAnalyticsEndpoint;
module.exports.sendAnalytics = sendAnalytics;
module.exports.setResponseLocals = setResponseLocals;
