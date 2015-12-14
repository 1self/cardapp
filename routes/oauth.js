/*jslint node: true */
'use strict';
var scopedLogger = require('./scopedLogger');
var request = require('request');

var signedInRoute = function(req, res, next){
	if(req.session.signedIn === undefined || req.session.signedIn === false){

		if(req.query.appid && req.query.streamid && req.query.readToken)
		{
			req.session.referrer = {
				appId: req.query.appid,
				streamId: req.query.streamid,
				readToken: req.query.readToken,
				version: req.query.version
			};

			req.session.shouldRegisterStream = true;
			req.session.streamRegistered = false;
		}

		if(req.query.email){
			getAuthCode(req, res, next);
			return;
		}
		
		res.render('index');
	}
	else {
		next();
	}
};

var signedInAsAdmin = function(req, res, next) {
	var adminUsers = ['ed', 'm'];

	var notAdmin = function() {
		if (req.session.profile !== undefined)  {
			req.session.isAdmin = false;
		}
		res.render('index');
	};

	if (req.session.signedIn === undefined || req.session.signedIn === false) {
		notAdmin();
	} else if (adminUsers.indexOf(req.session.profile.username) < 0) {
		notAdmin();
	} else {
		req.session.profile.isAdmin = true;
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

var getPostLoginRedirect = function(referrer) {
	if (referrer.indexOf('/info/') >= 0) {
		var ref = referrer.split('/info/');
		return ref[0] + '/';
	} else {
		return referrer;
	}
};

var storePostLoginRedirect= function(req){
	req.session.postSignInRedirect = getPostLoginRedirect(req.get('Referrer'));
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
module.exports.signedInAsAdmin = signedInAsAdmin;
module.exports.redirect = redirect;
module.exports.signedIn = signedIn;
module.exports.signIn = signIn;
module.exports.signOut = signOut;
module.exports.storePostLoginRedirect = storePostLoginRedirect;
module.exports.getAuthCode = getAuthCode;
module.exports.getAuthCodeFromSignup = getAuthCodeFromSignup;
module.exports.deleteToken = deleteToken;
module.exports.logout = logout;

