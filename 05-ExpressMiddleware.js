/**
 * Created by Bente on 04-03-2016.
 */

//05. Explain, using relevant examples, the Express concept; middleware.

// Express middlewares and Node modules are pluggable JavaScript components, which make Express apps very modular,
// flexible, and extensible.
// The middleware system allows small re-usable programs to handle HTTP-specific functionalities.
// An Express application is essentially a stack of middleware which are executed in a pipeline (serially).

// A middleware is a function with access to the request object (req), the response object (res), and the next
// middleware in line in the request-response cycle of an Express application.
// Each Middleware functions can perform the following tasks:
//      Execute any code.
//      Make changes to the request and the response objects.
//      End the request-response cycle.
//      Call the next middleware function in the stack.
//
// If the current middleware function does not end the request-response cycle, it must call next() to
// pass control to the next middleware function. Otherwise, the request will be left hanging.

// Every time we using the app.use ore app.(METHOD) functions we are using middleware. When we write this we are
// binding application-level middleware to an instance of the app object. Where METHOD is the HTTP method of the
// request that the middleware function handles (such as GET, PUT, or POST) in lowercase. Ex.

var app = express();

app.use(function (req, res, next) {         //This example shows a middleware function with no mount path.
    console.log('Time:', Date.now());       //The function is executed every time the app receives a request.
    next();
});

app.get('/user/:id', function (req, res, next) {    // This example shows a route and its handler function (middleware system).
    res.send('USER');                               // The function handles GET requests to the /user/:id path.
});

// In order to use middleware we have to install it in the command promt in the project.
// Since middleware are executed serially, their order of inclusion is very important. In this example the fact that
// app.use('/api', api); and the session-middleware,  comes before the app.use('/', routes); and
// app.use('/users', users); means that a person is allowed to use the REST API in the URL even when not logged in.

// The following code is taken from my own project: JSPeriod2-NodelExpress-JokeApiEx
// Here is the link to the code:
// https://github.com/Bente80/JSPeriod2-NodelExpress-JokeApiEx/blob/master/app.js

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/jokeApi');

var app = express();

// view engine setup                                            ----- All this is middelvare -----
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');//                                            From here

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'secret_3162735',saveUninitialized:true, resave: true}));

app.use('/api', api);

app.use(function (req, res, next) {
    var session = req.session;
    if (session.userName) {
        return next();
    } else {
        if (req.body.userName) {
            session.userName = req.body.userName;
            return res.redirect('/');
        } else {
            req.url = '/login';
            return next();
        }
    }
});

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler. Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });//                                                           To here
    });
}//                                                        ----- All this is middelvare ---------

// Production error handler. No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
