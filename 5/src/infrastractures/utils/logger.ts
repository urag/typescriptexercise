var winston = require("winston");

export var logger = winston.createLogger({
    transports: [new winston.transports.Console()]
});