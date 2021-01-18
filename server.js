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
