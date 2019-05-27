
function sumTwoNumbers(a, b) {
    var result = a + b;
    console.log("Returning %s by worker %s", result, process.pid);
    return result;
}

process.on("message", data => {
    console.log("Child worker %s got message %s", process.pid, data)
    process.send(sumTwoNumbers(data.x, data.y));
});

