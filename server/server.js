"use strict";

var http = require('http');
var path = require('path');
var express = require('express');
var ns = require('express-namespace');
var mongoose = require("mongoose");
var MongoStore = require('connect-mongo')(express);
var app = module.exports = express();
var rootDir = process.cwd();
var mode = app.settings.env;
var dev = mode === 'development';
var dbName = 'seed';
var dbUri = 'mongodb://127.0.0.1:27017/' + dbName;

global.conn = mongoose.createConnection(dbUri);
conn.once('open', function () {
    console.log('database connection established');
});

/** Configuration  */
app.set('port', 3001);
app.use(express.errorHandler());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.favicon());
app.use(require('less-middleware')({src: rootDir + '/app', force: dev}));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('cookie key'));
app.use(express.session({
    secret: 'topsecret',
    maxAge: new Date(Date.now() + 10000),
    store: new MongoStore({db: dbName})
}));
app.use(express.static(path.join(rootDir, 'app')));
app.use(app.router);

/** Routes */
var auth = require('./routes/auth');
var module1 = require('./routes/module1');
var module2 = require('./routes/module2');
var profile = require('./routes/profile');


// serve index
app.get('/', function(req, res){res.render('index', {env: mode});});

app.namespace('/auth', function(){
    app.get('/partials/:name', auth.partials);
    app.all('/api/:name', auth.api);
});

app.namespace('/module_1', function(){
    app.get('/partials/:name', module1.partials);
    app.all('/api/:name', module1.api);
});

app.namespace('/module_2', function(){
    app.get('/partials/:name', module2.partials);
    app.all('/api/:name', module2.api);
});

app.namespace('/profile', function(){
    app.get('/partials/:name', profile.partials);
    app.all('/api/:name', profile.api);
});

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){res.render('index', {env: mode});});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
