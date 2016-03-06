/**
 * Created by Bente on 06-03-2016.
 */

// 03. Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to
// implement a Node.js based server architecture that still could take advantage of a multi-core Server.

// Even though Node uses a Single Threaded strategy, it is easy to scale it to multi-core machines. For CPU intensive
// task Node.js can fire up child processes, and for scaling up webservices the trick is to start multiple node
// instances on the fly. Node has built in support for this via the Clustering module and Express run multiple virtual
// hosts (i.e. run multiple domains under one IP) out of the box.

// The Cluster module allows you to create a small network of separate processes(workers) which share server ports with
// the main Node process(master).This gives your Node.js app access to the full power of your server. A cluster module
// executes the same Node.js process multiple times. Therefore, the first thing you need to do is to identify what
// portion of the code is for the master process and what portion is for the workers. The master process is the process
// you initiate, which in turn initialize the workers. To start a worker process inside a master process, we’ll use the
// fork() method.

var cluster = require('cluster');                       // Include the cluster module

if (cluster.isMaster) {                           // Code to run if we're in the master process:

    var cpuCount = require('os').cpus().length;                 // Count the machine's CPUs

    for (var i = 0; i < cpuCount; i += 1) {                     // Create a worker for each CPU
        cluster.fork();

        cluster.on('online', function(worker) {                     // Listen for workers online
            console.log('Worker ' + worker.process.pid
                + ' is online');
        });

        cluster.on('exit', function(worker, code, signal) {         // Listen for dying workers
            console.log('Worker ' + worker.process.pid +
                ' died with code: ' + code + ', and signal:'
                + signal)
            console.log('Starting a new worker');           // Replace the dead worker.
            cluster.fork();
        });

    };
}

else {                                         // Code to run if we're in a worker process:

    var express = require('express');                   // Include Express
    var app = express();                                // Create a new Express application

    app.get('/', function (req, res) {                  // Add a basic route – index page
        res.send('Hello World!');
    });

    app.listen(3000);                                   // Bind to a port
    console.log('Application running!');
}
