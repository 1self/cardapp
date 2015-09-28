'user strict';
var express = require('express');
var request = require('request');
var router = express.Router();
var oauth = require('./oauth.js');
var conceal = require('concealotron');

router.get('/signin', 
	function(req, res, next){
		if(oauth.signedIn === true){
			oauth.redirect(req, res, next);
		} 
		else{
			oauth.storePostLoginRedirect(req);
			oauth.getAuthCode(req, res, next)
		}
});

router.get('/signup', 
	function(req, res, next){
		if(oauth.signedIn === true){
			oauth.redirect(req, res, next);
		} 
		else{
			oauth.storePostLoginRedirect(req);
			oauth.getAuthCodeFromSignup(req, res, next)
		}
});

router.get('/callback', 
	function(req, res, next){
		req.app.locals.logger.info('auth callback hit, authcode ', req.query.code);

		var stateCheck = req.query.state;
		if(stateCheck !== req.session.state){
			debugger;
			req.app.locals.logger.error('auth callback refused due to state check failure');
			res.status(401).send('state check failed');
			return;
		}

		var authcode = req.query.code;
		var url = req.app.locals.AUTH_TOKEN_URL;
		var port = req.app.settings.port;
		var redirectUri = req.protocol 
						+ '://' 
						+ req.hostname 
						+ (port ? ':' + port : '')
						+ '/auth/callback';
		
		var form = {
			redirect_uri: redirectUri,
			grant_type: 'authorization_code',
			code: authcode
		};

		var auth = {
			user: req.app.locals.AUTH_CLIENT_ID,
			pass: req.app.locals.AUTH_CLIENT_SECRET,
		};

		request.post({
			url: url,
			form: form,
			auth: auth,
			json: true
		}, function(error, httpResponse, body){
			req.app.locals.logger.info('token retrieved', conceal(body.access_token));
			oauth.signIn(req, body.access_token);
			oauth.redirect(req, res, next);
		});
	}
);

module.exports = router;