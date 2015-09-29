'user strict';
var express = require('express');
var request = require('request');
var router = express.Router();
var oauth = require('./oauth.js');
var conceal = require('concealotron');
var scopedLogger = require('./scopedLogger');
router.get('/signin', 
	function(req, res, next){
		if(oauth.signedIn === true){
			oauth.redirect(req, res, next);
		} 
		else{
			oauth.storePostLoginRedirect(req);
			oauth.getAuthCode(req, res, next);
		}
});

router.get('/signup', 
	function(req, res, next){
		if(oauth.signedIn === true){
			oauth.redirect(req, res, next);
		} 
		else{
			oauth.storePostLoginRedirect(req);
			oauth.getAuthCodeFromSignup(req, res, next);
		}
});

var getProfile = function(req, res, next){
	debugger;
	var tokenLogger = scopedLogger.logger(conceal(req.session.token), req.app.locals.logger);
	tokenLogger.silly('getting profile');
	
	var requestOptions = {
		url: req.app.locals.API_URL + '/me/profile',
		headers: {
			Authorization: 'Bearer ' + req.session.token
		},
		json: true
	};

	request(requestOptions, function(error, httpResponse, body){
		if(error){
			tokenLogger.error(error);
			return;
		}

		if(httpResponse.statusCode !== 200){
			tokenLogger.error('error while retrieving profile, code, body', [httpResponse.statusCode, httpResponse.body]);
			res.status(httpResponse.statusCode).send('internal error');
			return;
		}

		tokenLogger.debug('profile retrieved', conceal(body.username));
		req.session.profile = body;
		next();
	});
};

var getAccessToken = function(req, res, next){
	debugger;
	var logger = scopedLogger.logger(conceal(req.query.code), req.app.locals.logger);
	logger.info('auth callback hit', req.query.code);

	var stateCheck = req.query.state;
	if(stateCheck !== req.session.state){
		logger.error('auth callback refused due to state check failure');
		res.status(401).send('state check failed');
		return;
	}

	var authcode = req.query.code;
	var url = req.app.locals.AUTH_TOKEN_URL;
	var port = req.app.settings.port;
	var redirectUri = req.protocol + 
		'://' + 
		req.hostname + 
		(req.hostname === 'localhost' ? ':' + port : '') + 
		'/auth/callback';
	
	var form = {
		redirect_uri: redirectUri,
		grant_type: 'authorization_code',
		code: authcode
	};

	var auth = {
		user: req.app.locals.AUTH_CLIENT_ID,
		pass: req.app.locals.AUTH_CLIENT_SECRET,
	};

	logger.silly('requesting access_token');

	request.post({
		url: url,
		form: form,
		auth: auth,
		json: true
	}, function(error, httpResponse, body){
		if(error){
			logger.error(error);
			return;
		}

		if(httpResponse.statusCode !== 200){
			logger.error('error while requesting access_token, code, body', [httpResponse.statusCode, httpResponse.body]);
			res.status(httpResponse.statusCode).send('internal error');
			return;
		}

		logger.info('token retrieved', conceal(body.access_token));
		oauth.signIn(req, body.access_token);
		next();
	});
};

router.get('/callback', 
	getAccessToken,
	getProfile,
	oauth.redirect
);

module.exports = router;
