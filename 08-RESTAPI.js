/**
 * Created by Bente on 06-03-2016.
 */
// 08.Explain, using a relevant examples, your strategy for implementing a REST-API with Node/Express and show
// how you can "test" all the four CRUD operations programmatically using for example the Request package.

// The following code is taken from my own project: JSPeriod2-NodelExpress-JokeApiEx
// Here is the link´s to the code:
// https://github.com/Bente80/JSPeriod2-NodelExpress-JokeApiEx/blob/master/app.js
// https://github.com/Bente80/JSPeriod2-NodelExpress-JokeApiEx/blob/master/routes/jokeApi.js
// https://github.com/Bente80/JSPeriod2-NodelExpress-JokeApiEx/blob/master/testAPI/apiTester.js
// Simply runnning this code example won´t work.

// In app.js we:
// =============================================================================
// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var app        = express();                 // define our app using express

// configure app to use bodyParser()        //this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// register our routes and api
app.use('/api', api);
app.use('/', routes);

// In jokeApi.js we make the rest API:
// =============================================================================
var express = require('express');
var jokes = require('../model/jokes');      // get an instance of the js file where our joke api is and the method fore
                                            // them.
var router = express.Router();              // get an instance of the express Router

router.get("/joke/random",function(req,res, next){
    res.send({joke: jokes.getRandomJoke()});
});

router.get("/jokes",function(req,res, next){
    res.send({jokes: jokes.allJokes});                 /// You can also:  res.end(JSON.stringify(jokes.allJokes));
});

router.post("/joke",function(req,res, next){
    var newjoke = req.body.joke;
    jokes.addJoke(newjoke);
    res.send({joke: newjoke});                        /// I tried another way, but did not work: res.end(JSON.stringify(jokes.addJoke(newjoke)));
});

module.exports = router;

// The testing of the rest API is in apiTester.js
// =============================================================================

var request = require("request");

var testOfPost = {
    url: "http://localhost:3000/api/joke",
    method: "POST",
    json : true,
    body : {joke : "This is a test joke you stupid hippopotamus"}
}
request(testOfPost,function(error,res,body){ // Here I test the post method.
    console.log("Test af post: "+body.joke); //Assume the service returns the new Joke
})

// Here is one way of dooing a test method with get:
request("http://localhost:3000/api/joke/random", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var randomjoke = JSON.parse(body);
        console.log("Test af get random joke: "+randomjoke.joke) // Show the HTML for the random joke homepage.
    }
})

// Here is another way of dooing a test method with get (Mikkels way):
request("http://localhost:3000/api/jokes", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var alljokes = JSON.parse(body);               // we have to define that it is json format in order to use the body, and thereby remove the {}
        console.log("Test af jokes: "+alljokes.jokes) // Show the HTML for all the joke homepage.
    }
})
