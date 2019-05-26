var server = require('./server');
var client = require('./client');

server.init();
setTimeout(() => {
    client.callXTimes(10);
}, 2000);