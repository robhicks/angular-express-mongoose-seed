"use strict";

var http = require('http');
var path = require('path');
var express = require('express');
var mongoose = require("mongoose");
var MongoStore = require('connect-mongo')(express);
var app = module.exports = express();

var mode = app.settings.env;
var rootDir = process.cwd();
var dbName = 'seed';
var dbUri = 'mongodb://127.0.0.1:27017/' + dbName;

global.conn = mongoose.createConnection(dbUri);
conn.once('open', function () {
    console.log('database connection established');
});

var routes = require('./routes');
var api = require('./routes/api');
var rest = require('./routes/rest');

/**
 * Configuration
 */

app.set('port', 3000);
app.use(express.errorHandler());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.favicon());
if(mode === 'development'){
    app.use(require('less-middleware')({src: rootDir + '/public', force: true}));
    app.use(express.logger('dev'));
} else {
    app.use(require('less-middleware')({src: rootDir + '/public', force: false}));
}
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('cookie key'));
app.use(express.session({
    secret: 'topsecret',
    maxAge: new Date(Date.now() + 10000),
    store: new MongoStore({db: dbName})
}));
app.use(express.static(path.join(rootDir, 'public')));
app.use(app.router);

/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// API
app.all('/api/name', api.name);

// REST
app.all('/rest/loan', rest.loan);
app.all('/rest/loan/', rest.loan);
app.all('/rest/loan/:id', rest.loan);
app.all('/rest/borrower', rest.borrower);
app.all('/rest/borrower/', rest.borrower);
app.all('/rest/borrower/:id', rest.borrower);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
