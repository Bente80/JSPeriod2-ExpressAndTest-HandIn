/**
 * Created by Bente on 06-03-2016.
 */

// 10. Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.

// Mock objects are simulated objects that mimic the behavior of real objects in controlled ways. They have the same
// interface as the real objects they mimic, allowing a client object to remain unaware of whether it is using a real
// object or a mock object.
// Nock is an HTTP mocking and expectations library for Node.js
// Nock can be used to test modules that perform HTTP requests in isolation (that is without performing a real network
// operation).

// The following code is taken from my own project: JSPeriod2-NodelExpress-JokeApiEx
// Here is the link´s to the code:
// https://github.com/Bente80/JSPeriod2-NodelExpress-JokeApiEx/blob/master/testAPI/MockingNockAPITest.js
// The following example won´t work, because chai and nock is not installed in the project, and we don´t have acces to
    // the jokes js file. Go to the JSPeriod2-NodelExpress-JokeApiEx project to execute.

var expect = require("chai").expect;
var jokes = require("../model/jokes");
var nock = require("nock");
var testJoke = {"id": 1234, "joke": "Sunshine reggae....jubiii", "reference": "unknown"};

var n = nock('http://localhost:3000');

describe('Jokes API Get', function () {
    before(function (done) {
        n.get('/api/joke/random')
            .reply(200,testJoke );
        done();
    });

    it('should fetch the "Sunshine reggae....jubiii" joke', function () {
        jokes.getRandomJoke(function (err, joke) {
            if (err) {
                throw err;
            }
            expect(joke.reference).to.be.equal("unknown");
            expect(joke).to.be.eql(testJoke);
        })
    });
});



