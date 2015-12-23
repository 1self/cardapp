var router = require('../index.js');
var assert = require('assert');

describe('analytics routes', function(){
	it('non authed users directed to anonymous endpoint', function(){
		var req = {
			app: {
				locals: {
					API_URL: 'http://example.com'
				}
			},

			session: {

			}
		};

		var res = {
			locals: {}
		};

		var next = function(){
			assert.equal(res.locals.request.url, 'http://example.com/anonymous/activity');
		};

		router.chooseAnalyticsEndpoint(req, res, next);
	});

	it('authed users directed to token endpoint', function(){
		var req = {
			app: {
				locals: {
					API_URL: 'http://example.com'
				}
			},

			session: {
				token: 'token'
			}
		};

		var res = {
			locals: {}
		};

		var next = function(){
			assert.equal(res.locals.request.url, 'http://example.com/me/activity');
		};

		router.chooseAnalyticsEndpoint(req, res, next);
	});
});

describe('sendAnalytics', function(){
	it('sends the request object', function(){
		var req = {};

		var httpCalled = false;
		var httpRequest = function(options, callback){
			httpCalled = true;
			callback();
		};

		var res = {
			locals: {
				httpRequest: httpRequest
			},
			send: function (){
				assert.equal(httpCalled, true);
			}
		};

		var next = function(){};

		router.sendAnalytics(req, res, next);
	});

	it('sets response locals', function () {
	  	var req = {};
	  	var res = {
	  		locals: {}
	  	};

	  	var next = function(){};
	    router.setResponseLocals(req, res, next);

	    console.log(res.locals.request);
	    assert(res.locals.httpRequest !== undefined);
  	});
});