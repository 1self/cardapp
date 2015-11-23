/*jslint node: true */
'use strict';

var express = require('express');
var oauth = require('./oauth');
var router = express.Router();
var request = require('request');
var proxyRequest = require('./proxyRequest');
var profile = require('./profile.js');
var fs = require('fs');

/* GET home page. */
var registerStream = function(req, res, next){
	if(	req.session.shouldRegisterStream && 
		req.session.streamRegistered === false &&
		req.session.referrer){
		
		var requestOptions = {
			url: req.app.locals.API_URL + '/me/streams?readToken=' + req.session.referrer.readToken,
			method: "POST",
			headers: {
			   'Authorization': 'Bearer ' + req.session.token
			},
			json: true,
			body: {
				streamId: req.session.referrer.streamId
			}
		};

		request(requestOptions, function(error, httpResponse, body){
			req.session.shouldRegisterStream = false;
			if (!error) {
	        	if (httpResponse.statusCode === 200) {
	        		req.session.streamRegistered = body; // normally body is true
	        		next();
	        	} else if (httpResponse.statusCode === 401) {
	        		req.app.locals.logger.error('Error trying to register stream on API', httpResponse.statusCode, body);
	        		res.status(401).send('unauthorised');
	        	} else {
					req.app.locals.logger.error('Error trying to register stream on API', httpResponse.statusCode, body);
	        		res.status(500).send('internal server error trying to register stream');
				}
	        } 
	        else {
	        	// do this once the stream is registered
				req.app.locals.logger.error('Error trying to register stream on API', error);
	        	res.status(500).send('internal server error trying to register stream');
	        }
		});
		
	}
	else{
		next();
	}
};

var renderEntryPoint = function(req, res, next) {
	if(req.session.profile.cardCount > 0){
		res.render('card-stack', { profile: req.session.profile });
	}
	else {
		res.render('integrations', { profile: req.session.profile });
	}
};

var renderProfile = function(req, res, next) {
	res.render('profile', { profile: req.session.profile });
};

var renderAdmin = function(req, res, next) {
	res.render('admin', { profile: req.session.profile });
};

var renderIntegrations = function (req, res, next) {
	if (!req.params.serviceIdentifier)
		res.render('integrations', { profile: req.session.profile });
	else
		res.render('integration', { profile: req.session.profile, serviceIdentifier: req.params.serviceIdentifier });
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

var renderLog = function(req, res, next) {
	res.render('log', { profile: req.session.profile, newActivityState: req.params.newActivityState });
};

var renderDataExplorer = function(req, res, next) {
//	/explore/chart/streams/:streamId/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate
	var username = '';

	if (req.session !== undefined && req.session.profile !== undefined)
		username = req.session.profile.username;

	res.render('data-explorer', 
		{
			loggedInUsername: username,
			chartUsername: req.params.chartUsername,
			streamId: req.params.streamId,
			objectTags: req.params.objectTags,
			actionTags: req.params.actionTags,
			aggregator: req.params.aggregator,
			aggregatePeriod: req.params.aggregatePeriod,
			chartType: req.params.chartType,
			fromDate: req.params.fromDate,
			toDate: req.params.toDate,
			readToken: req.params.readToken
		});
};

var renderDataExplorerVs = function(req, res, next) {
//	/explore/chart/streams/:streamId/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate
	var username = '';

	if (req.session !== undefined && req.session.profile !== undefined)
		username = req.session.profile.username;

	res.render('data-explorer', 
		{
			loggedInUsername: username,
			chartUsername: req.params.chartUsername,
			streamId: req.params.streamId,
			objectTags: req.params.objectTags,
			actionTags: req.params.actionTags,
			aggregator: req.params.aggregator,
			aggregatePeriod: req.params.aggregatePeriod,
			chartType: req.params.chartType,
			fromDate: req.params.fromDate,
			toDate: req.params.toDate,
			objectTags1: req.params.objectTags1,
			actionTags1: req.params.actionTags1,
			aggregator1: req.params.aggregator1,
			chartType1: req.params.chartType1,
			readToken: req.params.readToken
		});
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

var streamBelongsToUser = function(streamId, username) {
	return true;
};

var getExploreSession = function(req, res, next) {
	if(req.session.signedIn === undefined || req.session.signedIn === false){
		next();
	} else {
		if (streamBelongsToUser(req.params.streamId, req.session.profile.username)) {
			var userExploreUrl;
			var urlParts = req.url.toLowerCase().split('/streams/');
			var urlEnd = urlParts[1].split('/');
			urlEnd.splice(0, 1);
			urlEnd = urlEnd.join('/');
			userExploreUrl = urlParts[0] + '/user/' + req.session.profile.username + '/' + urlEnd;
			res.redirect(userExploreUrl);			
		} else {
			next();
		}
	}	
};

var getOfflineData = function(req, res, next) {

	fs.readFile('offline.json', function(err, data) {
		req.cards = data;
		next();
	});

};

var getCardData = function(req, res, next) {
	var queryKeys = Object.keys(req.query);
	var qs = [];
	var qsString = '';
	var url;
	var offline = req.app.locals.OFFLINE === 'true';

	if (!offline) {

		for (var i = 0; i < queryKeys.length; i++) {
			qs.push(queryKeys[i] + '=' + req.query[queryKeys[i]]);
		}

		if (qs.length > 0) {
			qsString = '?' + qs.join('&');
		}

		if (req.params.username) {
			var username = decodeURIComponent(req.params.username);
			url = req.app.locals.API_URL + '/users/' + username + '/cards';
		} else {
			url = req.app.locals.API_URL + '/me/cards';
		}

		url += qsString;

		var requestOptions = {
			 url: url,
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
	} else {
		getOfflineData(req, res, next);
	}
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

var buildChartDataUrl = function(req) {
	var url = req.app.locals.APP_URL;

// https://app.1self.co/v1/users/m/events/1self/browse/sum(times-visited)/daily/barchart?shareToken=da9cd22ea279c13d88fab71959ad58cd9472856e8728ce3b2eafa83bac75febd&bgColor=00a2d4&from=2015-11-12T00:00:00.000Z&to=2015-11-18T23:59:59.999Z

	if (req.params.chartUsername !== undefined && req.params.chartUsername !== '') {
		url += '/users/' + req.params.chartUsername;
	} else if (req.params.streamId !== undefined && req.params.streamId !== '') {
		url += '/streams/' + req.params.streamId;
	} else {
		url = 'invalid-params';
	}

	if (url !== 'invalid-params') {
		url += '/events';
		url += '/' + req.params.objectTags;
		url += '/' + req.params.actionTags;
		url += '/' + req.params.aggregator;
		url += '/' + req.params.aggregatePeriod;
		url += '/type/json';
		url += '?from=' + req.params.fromDate;
		url += '&to=' + req.params.toDate;

		if (req.query.readToken !== undefined && req.query.readToken !== '') {
			url += '&readToken=' + req.query.readToken;
		}
	}

	return url;
};

var getChartData = function(req, res, next) {

// https://api-staging.1self.co/v1/streams/MVIBQAXRNFXHIYQR/events/self/exercise/count/daily/type/json?readToken=5577db06e6b0fa0ed1f24b56b40e64431dd691d6d252&bgColor=&from=2015-10-19t23:00:00.000z&to=2015-11-19t00:00:00.000z
	
	var url = buildChartDataUrl(req);

	console.log('getting chart data', url);

	var requestOptions = {
		 url: url
	};

	if (req.session !== undefined) {
		requestOptions.headers = {
			'Authorization': 'Bearer ' + req.session.token
		}
	}

	request(requestOptions,
		function (error, httpResponse, body) {
	        if (!error) {
	        	if (httpResponse.statusCode === 200) {
	        		req.chartData = body;
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

var sendChartData = function(req, res, next) {
	res.status(200).send(req.chartData);	
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
		 },
		 json: true,
		 body: req.body
	};

	var patchRequest = proxyRequest.create(requestOptions);
	patchRequest.pipe(res);
};

var patchCards = function(req, res, next){
	var url = req.app.locals.API_URL + 
		'/me/cards';

	var requestOptions = {
		 url: url,
		 method: 'PATCH',
		 headers: {
		   'Authorization': 'Bearer ' + req.session.token
		 },
		 json: true,
		 body: req.body
	};

	var patchRequest = proxyRequest.create(requestOptions);
	patchRequest.pipe(res);
};

var getIntegrationDetails = function(req, res, next){
	var url = req.app.locals.API_URL + '/integrations/' + req.params.serviceIdentifier;
	var options = {
		json: true,
		url: url
	};

	request(options, function(error, httpResponse, body){
		if (!error) {
        	if (httpResponse.statusCode === 200) {
        		req.integration = body;
        		next();
        	} else if (httpResponse.statusCode === 404) {
        		req.app.locals.logger.error('Error trying to integration, integration not found', httpResponse.statusCode, body);
        		res.status(404).send('unauthorised');
        	} else {
				req.app.locals.logger.error('Error trying to get integration', httpResponse.statusCode, body);
        		res.status(500).send('internal server error');
			}
        } else {
			req.app.locals.logger.error('500 Error trying to get integration', error);
        	res.status(500).send('internal server error');
        }
	});
};

var redirectToIntegration = function(req, res, next) {
	var port = req.app.settings.port;
	var redirectBackToCardApp = encodeURIComponent(req.protocol + 
		'://' + 
		req.hostname + 
		(req.hostname === 'localhost' ? ':' + port : '') + 
		'/integrations/' + 
		req.params.serviceIdentifier);
	
	var integrationUrl = req.integration.integrationUrl + 
		'?redirect_uri=' + redirectBackToCardApp +
		'&username=' + req.session.profile.username +
		'&token=' + req.session.profile.registrationToken;

	res.redirect(integrationUrl);
};

var redirectToOldDashboard = function(req, res, next) {
	console.log(req.app.locals);
	res.redirect(req.app.locals.DASHBOARD_URL);
};

router.get('/',
	oauth.signedInRoute,
	profile.getProfile,
	registerStream,
	renderEntryPoint

);

router.get('/card-stack',
	oauth.signedInRoute,
	profile.getProfile,
	renderEntryPoint

);

router.get('/profile',
	oauth.signedInRoute,
	profile.getProfile,
	renderProfile
);

router.get('/integrations',
	oauth.signedInRoute,
	renderIntegrations
);

router.get('/dashboard',
	oauth.signedInRoute,
	redirectToOldDashboard
);

router.get('/admin',
	oauth.signedInRoute,
	oauth.signedInAsAdmin,
	renderAdmin
);

router.get('/integrations/:serviceIdentifier',
	oauth.signedInRoute,
	renderIntegrations
);

router.get('/integrations/:serviceIdentifier/redirect',
	oauth.signedInRoute,
	getIntegrationDetails,
	redirectToIntegration
);

router.get('/chart.html', 
	oauth.signedInRoute,
	function(req, res) {
  		res.render('chart', { });
  	}
);

// admin use only
router.get('/data/cards/:username', 
	checkForSession,
	oauth.signedInAsAdmin,
	getCardData, 
	sendCardData
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

router.get('/data/streams/:streamId/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate', 
	getChartData, 
	sendChartData
);

router.get('/data/user/:chartUsername/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate', 
	getChartData, 
	sendChartData
);

router.get('/explore/chart/streams/:streamId/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate',
	getExploreSession,
	renderDataExplorer
);

router.get('/explore/chart/streams/:streamId/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate/vs/:objectTags1/:actionTags1/:aggregator1/:chartType1',
	getExploreSession,
	renderDataExplorerVs
);

router.get('/explore/chart/user/:chartUsername/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate',
	renderDataExplorer
);

router.get('/explore/chart/user/:chartUsername/:objectTags/:actionTags/:aggregator/:aggregatePeriod/:chartType/:fromDate/:toDate/vs/:objectTags1/:actionTags1/:aggregator1/:chartType1',
	renderDataExplorerVs
);

router.get('/info/unite-data',
	renderUniteData
);

router.get('/info/cant-build',
	renderCantBuild
);

router.get('/info/no-exploit',
	renderNoExploit
);

router.get('/info/quest',
	renderQuest
);

router.get('/info/privacy',
	renderPrivacy
);

router.get('/log',
	renderLog
);

router.get('/log/new/:newActivityState',
	renderLog
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

router.patch('/cards',
	checkForSession,
	patchCards);

// check for username match



module.exports = router;
