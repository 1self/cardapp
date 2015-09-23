'user strict';
var oauth = require('./oauth.js');

var router = express.Router();

router.get('/signin', 
	function(req, res, next){
		if(oauth.signedIn === true){
			oauth.redirect(req, res, next);
		} 
		else{
			oauth.auth(req, res, next)
		}
	}
});

router.get('/callback', 
	function(req, res, next){
		req.app.locals.logger.info('auth callback hit, authcode ', req.query.code);
		res.send(200);
	}
});