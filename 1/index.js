var server = require('./server');
var client = require('./client');
const cluster = require('cluster');

var numOfProcceses = 4;
if (cluster.isMaster) {
    for (i = 0; i < numOfProcceses; i++) {
        var ch_pr = cluster.fork();
        console.log("Procces %s foked %s", process.pid, ch_pr.pid)
    }

    setTimeout(() => {
        client.callXTimes(10);
    }, 2000);
} else {
    console.log("Procces %s starting server", process.pid);
    server.init();
}
