const server = require('./server');
const cluster = require('cluster');

module.exports.startServers = function startServers(amountOfServers) {
    if (cluster.isMaster) {
        for (i = 0; i < amountOfServers; i++) {
            cluster.fork();
        }
    } else {
        server.init();
    }
} 