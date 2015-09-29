/*jslint node: true */
'use strict';
var scopedLogger = require('./scopedLogger');
var request = require('request');

var signedInRoute = function(req, res, next){
	if(req.session.signedIn === undefined || req.session.signedIn === false){
		res.render('index');
	}
	else {
		next();
	}
};

var redirect = function(req, res, next){
	if(req.session.postSignInRedirect !== undefined){
		res.redirect(req.session.postSignInRedirect);
		delete req.session.postSignInRedirect;
	}
	else{
		res.redirect('/');
	}
};

var signedIn =function(req){
	return req.session.signedIn;
};

var signIn = function(req, token){
	req.session.signedIn = true;
	req.session.token = token;
};

var signOut = function(req){
	req.session.signedIn = false;
};

var storePostLoginRedirect= function(req){
	req.session.postSignInRedirect = req.get('Referrer');
};

var getRandomIntInclusive = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAuthCode = function(req, res, next){
	var port = req.app.settings.port;
	var state = getRandomIntInclusive(0, 1000000000);
	var redirectUri = req.protocol + 
		'://' + 
		req.hostname + 
		(req.hostname === 'localhost' ? ':' + port : '')+ 
		'/auth/callback';
	var authCodeUrl = req.app.locals.AUTH_AUTHCODE_URL + 
		'?client_id=' + req.app.locals.AUTH_CLIENT_ID + 
		'&redirect_uri=' + redirectUri + 
		'&response_type=code' + 
		'&state=' + state;

	req.session.state = '' + state;

	res.redirect(authCodeUrl);
};

		// var params = [
  //                   'intent=website_signup',
  //                   'username=' + username,
  //                   'service=' + service
  //               ];
                //var signupUrl = "/auth/signup?" + params.join('&');

var getAuthCodeFromSignup = function(req, res, next){
	var port = req.app.settings.port;
	var state = getRandomIntInclusive(0, 1000000000);
	var redirectUri = 	req.protocol + 
		'://' + 
		req.hostname + 
		(req.hostname === 'localhost' ? ':' + port : '')+ 
		'/auth/callback';

	var authCodeUrl = req.app.locals.AUTH_AUTHCODE_URL + '/signup' + 
		'?client_id=' + req.app.locals.AUTH_CLIENT_ID + 
		'&redirect_uri=' + redirectUri + 
		'&response_type=code' + 
		'&state=' + state + 
		'&intent=' + req.query.intent + 
		'&username=' + req.query.username + 
		'&service=' + req.query.service;

	req.session.state = '' + state;

	res.redirect(authCodeUrl);
};             

var deleteToken = function(req, res, next){
	var requestOptions = {
		url: req.app.locals.AUTH_TOKEN_URL,
		headers: {
		'Authorization': 'Bearer ' + req.session.token
		}
	};

	request.del(requestOptions,
		function (error, httpResponse, body) {
			if(error){
				res.status(500).send(body);
			}
			else if(httpResponse.statusCode !== 200){
				res.status(httpResponse.statusCode).send(body);
			}
	        else {
	        	next();
	        } 
	   }
	);
};

var logout = function(req, res, next){
	var port = req.app.settings.port;
	var redirectUri = 	req.protocol + 
		'://' + 
		req.hostname + 
		(req.hostname === 'localhost' ? ':' + port : '') + 
		'/';

	var url = req.app.locals.APP_URL + '/me/logout' + 
		'?redirect_uri=' + redirectUri;

	req.session.destroy();
	res.redirect(url);
};   

module.exports.signedInRoute = signedInRoute;
module.exports.redirect = redirect;
module.exports.signedIn = signedIn;
module.exports.signIn = signIn;
module.exports.signOut = signOut;
module.exports.storePostLoginRedirect = storePostLoginRedirect;
module.exports.getAuthCode = getAuthCode;
module.exports.getAuthCodeFromSignup = getAuthCodeFromSignup;
module.exports.deleteToken = deleteToken;
module.exports.logout = logout;

