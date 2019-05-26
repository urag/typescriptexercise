const http = require('http');
const port = 3000;
const cluster = require('cluster');

const reqHanler = (req, res) => {
    console.log("Worker %s got request %s", process.pid, req);
    sleep(2000);
    res.end("Hello there !!!");
}

module.exports.init = function init() {
    const server = http.createServer(reqHanler);
    server.listen(port, (err) => {
        if (err) {
            return console.log("Error happend", err);
        }
        console.log("Server is listening on port " + port);
    });
}

function sleep(ms) { // node.js >= 9.3  blocks event loop
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}