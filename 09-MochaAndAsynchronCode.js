/**
 * Created by Bente on 06-03-2016.
 */

// 09. Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to
// test asynchronous code.

// Mocha is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing
// simple. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions
// to the correct test case.
// Mocha can use any assertion library Assertions, but here I have used Chai.
// Mocha is used for unit and integration testing, and it's a great candidate for BDD (Behavior Driven Development).

// The following code is taken from my own project: JSPeriod2-NodeExpress-Test
// It illustrates Asyncron - Here is the link´s to the code:
// https://github.com/Bente80/JSPeriod2-NodeExpress-Test/blob/master/module.js
// https://github.com/Bente80/JSPeriod2-NodeExpress-Test/blob/master/test/testModules.js
// Simply running this code won´t work. It is better to run the whole project.

// This is a asynchronous method implemented in module.js:
function addAsync(n1,n2,callback){
    setTimeout(function(){
        var result = n1+n2;
        callback(result);
    },1000);
}

// The way we test the method in testModules.js:
var expect = require("chai").expect;
var adder = require("../module");

describe("Test calculator", function() {

    it("should return 10 asynchronouesly", function (done) {
        adder.addAsync(5, 5, function (res) {
            expect(res).to.be.equal(10);
            done();
        })
    })
})

// You can also look in the JSPeriod2-NodelExpress-JokeApiEx project. Here the REST API is tested with mocha.
// Here is the link´s to the code:
// https://github.com/Bente80/JSPeriod2-NodelExpress-JokeApiEx/blob/master/testAPI/ServerMoccaAPITest.js




