'use strict'

var signedInRoute = function(req, res, next){
	if(req.session.signedIn === undefined || req.session.signedIn === false){
		res.render('index');
	}
	else {
		next();
	}
}

var redirect = function(req, res, next){
	if(req.session.postSignInRedirect !== undefined){
		res.redirect(req.session.postSignInRedirect);
		delete req.session.postSignInRedirect;
	}
	else{
		res.redirect('/');
	}
}

var signedIn =function(req){
	return req.session.signedIn;
}

var signIn = function(req, token){
	req.session.signedIn = true;
	req.session.token = token;
}

var signOut = function(req){
	req.session.signedIn = false;
}

var storePostLoginRedirect= function(req){
	req.session.postSignInRedirect = req.get('Referrer');
}

var getRandomIntInclusive = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getAuthCode = function(req, res, next){
	var port = req.app.settings.port;
	var state = getRandomIntInclusive(0, 1000000000);
	var redirectUri = req.protocol 
					+ '://' 
					+ req.hostname 
					+ (port ? ':' + port : '')
					+ '/auth/callback';
	var authCodeUrl = req.app.locals.AUTH_AUTHCODE_URL
	+ '?client_id=' + req.app.locals.AUTH_CLIENT_ID
	+ '&redirect_uri=' + redirectUri
	+ '&response_type=code'
	+ '&state=' + state;

	req.session.state = '' + state;

	res.redirect(authCodeUrl);
}

module.exports.signedInRoute = signedInRoute;
module.exports.redirect = redirect;
module.exports.signedIn = signedIn;
module.exports.signIn = signIn;
module.exports.signOut = signOut;
module.exports.storePostLoginRedirect = storePostLoginRedirect;
module.exports.getAuthCode = getAuthCode;

