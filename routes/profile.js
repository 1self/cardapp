/*jslint node: true */
'user strict';

var scopedLogger = require('./scopedLogger');
var request = require('request');
var conceal = require('concealotron');

var getProfile = function(req, res, next){
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

module.exports.getProfile = getProfile;