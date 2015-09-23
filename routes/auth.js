'user strict';
var express = require('express');
var router = express.Router();
var oauth = require('./oauth.js');

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

router.get('/callback', 
	function(req, res, next){
		req.app.locals.logger.info('auth callback hit, authcode ', req.query.code);
		res.send(200);
	}
);

module.exports = router;