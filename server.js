//File: server.js
//Date: Jan 18, 2020
//Author: joelcs
//Desc: a simple http web server written in node.js

//node.js includes
const http = require('http');
const path = require('path');
const fs = require('fs');

//config
const configObj = require('./config.json');

//logger
const Logger = require('./logger');

const logger = new Logger(configObj.logPath);
const logPath = configObj.logPath;
console.log(logPath);

//link logger emitter to append to preferred file
logger.on('message', (data) => 
    fs.appendFile(path.join(__dirname, logPath), JSON.stringify(data) + '\n', err =>{
     if (err) throw err;
 })
);

logger.log('test message');