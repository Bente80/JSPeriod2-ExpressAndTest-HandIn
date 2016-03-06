/**
 * Created by Bente on 06-03-2016.
 */

//06. Explain, using relevant examples, how to implement sessions, and the legal implications of doing this.

// The reason we use sessions is because HTTP is a Stateless Protocol. Each request for a Web page or URL results
// in the requested pages being served, but without the Web (HTTP) server remembering the request later. In other
// words, there is no recorded continuity. Each communication is discrete and unrelated to those that precede or
// follow. Session is a way to store that information.
// A user's session for a website exists in temporary memory only while the user is reading and navigating the website.
// Web browsers normally delete session cookies when the user closes the browser.
// Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
// Client-side sessions use cookies and cryptographic techniques to maintain state without storing as much data on the server.

// A cookie is a small piece of data that a website asks your browser to store on your computer or mobile device.
// The cookie allows the website to "remember" your actions or preferences over time. Most browsers support cookies,
// but users can set their browsers to decline them and can delete them whenever they like.
// JavaScript code is able to read a cookie belonging to its domain and perform an action accordingly.
// EUROPA websites must follow the Commission's guidelines on privacy and data protection and inform users that cookies
// are not being used to gather information unnecessarily.
// The ePrivacy directive requires prior informed consent for storage of or access to information stored on a user's
// terminal equipment. In other words, you must ask users if they agree to most cookies and similar technologies
// (e.g. web beacons, Flash cookies, etc.) before the site starts to use them.

// The following code is taken from my own project: JSPeriod2-NodelExpress-JokeApiEx
// Here is the link to the code:
// https://github.com/Bente80/JSPeriod2-NodelExpress-JokeApiEx/blob/master/app.js    &

// Install the session middelware
var session = require("express-session");

// Use the session middleware
app.use(session({secret:'secret_3162735',saveUninitialized:true, resave: true}));

// Access the session as req.session.        The request property req.session is used to store or access session data.
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

// The use of cookies in this project is in the router folder in the index.js file. Here is a small ex of this.
// Here is the link to the code:
// https://github.com/Bente80/JSPeriod2-NodelExpress-JokeApiEx/blob/master/routes/index.js

var express = require('express');
var jokes = require('../model/jokes'); // My own implementation.
var router = express.Router();

router.get('/random', function(req, res, next){
    if(req.session.jokeCount){
        req.session.jokeCount++;
    }
    else{
        req.session.jokeCount =1;
    }
    console.log("*** Du har set en ny joke "+req.session.jokeCount+" gange");

    res.render('randomjoke',{   // the jade file name (randomjoke)
        random: jokes.getRandomJoke() // the variable in the file (random)
    });
});

// In the laout jade file I have included two scripts that tell the user that the site contains cookie:

// script(src='/javascripts/cookie_config.js' type='text/javascript')
// script(src='/javascripts/consent.js' type='text/javascript')

// Here is the link to the code:
// https://github.com/Bente80/JSPeriod2-NodelExpress-JokeApiEx/blob/master/views/layout.jade

