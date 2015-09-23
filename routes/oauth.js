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
}

var signedIn =function(req){
	return req.session.signedIn;
}

var signIn = function(req){
	req.session.signedIn = true;
}

var signOut = function(req){
	req.session.signedIn = false;
}

module.exports.signedInRoute = signedInRoute;
module.exports.redirect = redirect;
module.exports.signedIn = signedIn;
module.exports.signIn = signIn;
module.exports.signOut = signOut;

