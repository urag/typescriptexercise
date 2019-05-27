const fork = require('child_process').fork;
const path = require('path');

module.exports.init = function init(workersAmount) {
    const program = path.resolve('calcsum.js');
    const options = { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] };
    for (i = 0; i < workersAmount; i++) {

        const a = getRanfomNum(1000);
        const b = getRanfomNum(1000);

        const childProcess = fork(program, options);
        console.log("Forking calcsum worker %s with x:%s and y:%s", childProcess.pid, a, b);
        childProcess.send({ x: a, y: b });
        childProcess.on('message', result => {
            console.log("Got result %s from worker %s", result, childProcess.pid);
        })
    }

}

function getRanfomNum(max) {
    return Math.floor(Math.random() * max);
}
