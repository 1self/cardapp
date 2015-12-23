// globals required in browser

var assert = require('assert');
var analytics = require('../public/js/analytics.js');

describe('analytics module', function () {
  it('gets the google clientId', function () {

  	var ga = function(callback){
  		if(typeof callback === 'function'){
  			callback(12345);
  		}
  	};

    var a = new analytics.Create('12345', ga);
    assert.equal(a.getClientId(), 12345);
  });

  it('sends when the user is not logged in', function () {

  	var ga = function(callback){
  		if(typeof callback === 'function'){
        var tracker = {
          get: function(key){
            return 'clientId';
          }
        };
        
  			callback(tracker);
  		}
  	};

    var a = new analytics.Create('', ga);
    var event = {
    	test: 1
    };

    var jq = {};
    var url = '';
    var payload = {};
    var post = function(u, p){
    	url = u;
    	payload = p;
    };

    a.send('event', payload, 'http://example.com', post);
    assert.equal(payload.url, 'http://example.com');
    assert.equal(payload.trackingId, '');
    assert.equal(payload.clientId, 'clientId');
  });

  it('sends with trackingId when user logged in', function () {
  	var ga = function(callback){
      if(typeof callback === 'function'){
        var tracker = {
          get: function(key){
            return 'clientId';
          }
        };
        
        callback(tracker);
      }
    };

    var a = new analytics.Create('trackingId', ga);
    var event = {
    	test: 1
    };

    var jq = {};
    var url = '';
    var payload = {};
    var post = function(u, p){
    	url = u;
    	payload = p;
    };

    a.send('event', payload, 'http://example.com', post);
    assert.equal(payload.url, 'http://example.com');
    assert.equal(payload.trackingId, 'trackingId');
    assert.equal(payload.clientId, 'clientId');
  });

 
});