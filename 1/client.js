const http = require('http');
const host = "127.0.0.1";
const port = 3000;


module.exports.callXTimes = function callXTimes(timesToRepet) {
    const url = "http://" + host + ":" + port;
    for (i = 0; i < timesToRepet; i++) {
        var now = new Date();
        const reqId = (i + 1);
        console.log("Sending request by %s", reqId)
        http.get(url, resp => {
            console.log('Got response by %s from server after %s seconds', reqId, (new Date() - now) / 1000);
        });
    }
}