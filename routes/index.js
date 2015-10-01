/*jslint node: true */
'use strict';

var express = require('express');
var oauth = require('./oauth');
var router = express.Router();
var request = require('request');
var proxyRequest = require('./proxyRequest');

/* GET home page. */
var renderCardStack = function(req, res, next) {
	res.render('card-stack', { 
		username: 'ed' });
};

var renderProfile = function(req, res, next) {
	res.render('profile', req.session.profile);
};

var renderIntegrations = function (req, res, next) {
	if (!req.params.serviceIdentifier)
		res.render('integrations', { username: 'ed' });
	else
		res.render('integration', { username: 'ed', serviceIdentifier: req.params.serviceIdentifier });
};


/* Render WWW pages */

var renderUniteData = function(req, res, next) {
	res.render('unite-data');
};

var renderCantBuild = function(req, res, next) {
	res.render('cant-build');
};

var renderNoExploit = function(req, res, next) {
	res.render('no-exploit');
};

var renderQuest = function(req, res, next) {
	res.render('quest');
};

var renderPrivacy = function(req, res, next) {
	res.render('privacy');
};

/* ---------------- */


var checkForSession = function(req, res, next) {
	if(req.session.signedIn === undefined || req.session.signedIn === false){
		res.status(401).send('unauthorised');
	}
	else {
		next();
	}
};

var getCardData = function(req, res, next) {
	var queryKeys = Object.keys(req.query);
	var qs = [];
	var qsString = '';
	for (var i = 0; i < queryKeys.length; i++) {
		qs.push(queryKeys[i] + '=' + req.query[queryKeys[i]]);
	}

	if (qs.length > 0) {
		qsString = '?' + qs.join('&');
	}

	var requestOptions = {
		 url: req.app.locals.API_URL + '/me/cards' + qsString,
		 headers: {
		   'Authorization': 'Bearer ' + req.session.token
		 }
	};

	request(requestOptions,
		function (error, httpResponse, body) {
	        if (!error) {
	        	if (httpResponse.statusCode === 200) {
	        		req.cards = body;
	        		next();
	        	} else if (httpResponse.statusCode === 401) {
	        		req.app.locals.logger.error('Error trying to get card data from API', httpResponse.statusCode, body);
	        		res.status(401).send('unauthorised');
	        	} else {
					req.app.locals.logger.error('Error trying to get card data from API', httpResponse.statusCode, body);
	        		res.status(500).send('internal server error');
				}
	        } else {
				req.app.locals.logger.error('500 Error trying to get card data from API', error);
	        	res.status(500).send('internal server error');
	        }
	    });
};

var getIntegrationsData = function(req, res, next) {

	var requestOptions = {
		 url: req.app.locals.API_URL + '/me/integrations',
		 headers: {
		   'Authorization': 'Bearer ' + req.session.token
		 }
	};

	request(requestOptions,
		function (error, httpResponse, body) {
	        if (!error) {
	        	if (httpResponse.statusCode === 200) {
	        		req.integrations = body;
	        		next();
	        	} else if (httpResponse.statusCode === 401) {
	        		req.app.locals.logger.error('Error trying to get card data from API', httpResponse.statusCode, body);
	        		res.status(401).send('unauthorised');
	        	} else {
					req.app.locals.logger.error('Error trying to get card data from API', httpResponse.statusCode, body);
	        		res.status(500).send('internal server error');
				}
	        } else {
				req.app.locals.logger.error('500 Error trying to get card data from API', error);
	        	res.status(500).send('internal server error');
	        }
	    });
};

var sendCardData = function(req, res, next) {
	res.status(200).send(req.cards);	
};

var sendIntegrationsData = function(req, res, next) {
	res.status(200).send(req.integrations);
};

/* user name available check */

var checkUser = function(req, res, next){
	var requestOptions = {
		 url: req.app.locals.API_URL + '/user/' + req.params.username + '/exists',
		 headers: {
		   'Authorization': req.app.locals.USERNAME_EXISTS_TOKEN
		 }
	};

	request(requestOptions,
		function (error, httpResponse, body) {
	        if (!error) {
	        	res.status(httpResponse.statusCode).send(body);
	        } else {
				req.app.locals.logger.error('500 Error trying to get username exists from API', error);
	        	res.status(500).send('internal server error');
	        }
	   }
	);
};

/* getting the rollups */
var checkRollupRequestMatchesUsername = function(req, res, next){
	if(req.params.username === req.session.profile.username){
		next();
	}
	else {
		res.status(401).send('request made to retrieve rollups for another user than the one signed in');
	}
};

var getRollups = function(req, res, next){
	
	var url = req.app.locals.API_URL + 
		'/users/' + 
		req.session.profile.username + 
		'/rollups/day/' + 
		req.params.objectTags + 
		'/' + 
		req.params.actionTags + 
		'/' +
		encodeURIComponent(req.params.property) +
		'/' + 
		req.params.representation;

	var requestOptions = {
		 url: url,
		 headers: {
		   'Authorization': 'Bearer ' + req.session.token
		 }
	};

	var rollupRequest = proxyRequest.create(requestOptions);
	rollupRequest.pipe(res);
};

var patchCard = function(req, res, next){

	var url = req.app.locals.API_URL + 
		'/me/cards/' + req.params.cardId;

	var requestOptions = {
		 url: url,
		 method: 'PATCH',
		 headers: {
		   'Authorization': 'Bearer ' + req.session.token
		 }
	};

	var rollupRequest = proxyRequest.create(requestOptions);
	rollupRequest.pipe(res);

};

router.get('/',
	oauth.signedInRoute,
	renderCardStack
);

router.get('/card-stack',
	oauth.signedInRoute,
	renderCardStack
);

router.get('/profile',
	oauth.signedInRoute,
	renderProfile
);

router.get('/integrations',
	oauth.signedInRoute,
	renderIntegrations
);

router.get('/integrations/:serviceIdentifier',
	oauth.signedInRoute,
	renderIntegrations
);

router.get('/chart.html', 
	oauth.signedInRoute,
	function(req, res) {
  		res.render('chart', { });
  	}
);

router.get('/data/cards', 
	checkForSession, 
	getCardData, 
	sendCardData
);

router.get('/data/integrations', 
	checkForSession, 
	getIntegrationsData, 
	sendIntegrationsData
);

router.get('/unite-data',
	renderUniteData
);

router.get('/cant-build',
	renderCantBuild
);

router.get('/no-exploit',
	renderNoExploit
);

router.get('/quest',
	renderQuest
);

router.get('/privacy',
	renderPrivacy
);

router.get('/user/:username/exists', 
	checkUser
);

router.get('/logout', 
	oauth.deleteToken,
	oauth.logout
);

router.get('/v1/users/:username/rollups/day/:objectTags/:actionTags/:property/:representation',
	checkForSession,
	checkRollupRequestMatchesUsername,
	getRollups);

router.patch('/cards/:cardId',
	checkForSession,
	patchCard);

// check for username match



module.exports = router;
