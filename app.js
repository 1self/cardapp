var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var winston = require('winston');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var index = require('./routes/index');
var auth = require('./routes/auth');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';
app.locals.SESSION_SECRET = process.env.SESSION_SECRET || 'development';
app.locals.AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID;
app.locals.AUTH_CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;
app.locals.AUTH_AUTHCODE_URL = process.env.AUTH_AUTHCODE_URL;
app.locals.AUTH_TOKEN_URL = process.env.AUTH_TOKEN_URL;
app.locals.API_URL = process.env.API_URL;
app.locals.APP_URL = process.env.APP_URL;
app.locals.DASHBOARD_URL = process.env.DASHBOARD_URL;
app.locals.USERNAME_EXISTS_TOKEN = process.env.USERNAME_EXISTS_TOKEN;
app.locals.LOGFILE = process.env.LOGGINGDIR + '/cardapp.log';

// logging setup
winston.add(winston.transports.File, { filename: app.locals.LOGFILE, level: 'debug', json: false, prettyPrint: false });
winston.error("Errors will be logged here");
winston.warn("Warns will be logged here");
winston.info("Info will be logged here");
winston.debug("Debug will be logged here");
winston.silly("Silly will be logged here");
app.locals.logger = winston;

process.on('uncaughtException', function(err) {
  winston.error('Caught exception: ' + err);
  throw err;
});

// view engine setup
app.engine('swig', swig.renderFile);
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');
app.set('trust proxy', true);



// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new FileStore(),
    secret: app.locals.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/auth', auth);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
