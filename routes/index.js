var express = require('express');
var oauth = require('./oauth');
var router = express.Router();

/* GET home page. */
var renderCardStack = function(req, res, next){
	res.render('card-stack', { username: 'ed' });
}

router.get('/', 
	oauth.signedInRoute,
	renderCardStack);

router.get('/card-stack', 
	oauth.signedInRoute,
	renderCardStack);

router.get('/chart.html', 
	oauth.signedInRoute,
	function(req, res) {
  		res.render('chart', { });
  	});

module.exports = router;
