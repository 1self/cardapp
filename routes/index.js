var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('card-stack', { username: 'ed' });
});

router.get('/card-stack', function(req, res) {
  res.render('card-stack', { username: 'ed' });
});

router.get('/chart.html', function(req, res) {
  res.render('chart', { });
});

module.exports = router;
