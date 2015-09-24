var express = require('express');
var oauth = require('./oauth');
var router = express.Router();
var requestModule = require('request');

/* GET home page. */
var renderCardStack = function(req, res, next){
	res.render('card-stack', { username: 'ed' });
};

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

	requestOptions = {
		 url: req.app.locals.API_URL + '/me/cards' + qsString,
		 headers: {
		   'Authorization': 'Bearer ' + req.session.token
		 }
	};

	requestModule(requestOptions,
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

var sendCardData = function(req, res, next) {
	res.status(200).send(req.cards);	
};

router.get('/',
	oauth.signedInRoute,
	renderCardStack
);

router.get('/card-stack',
	oauth.signedInRoute,
	renderCardStack
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

module.exports = router;
