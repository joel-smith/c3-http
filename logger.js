//File: logger.js
//Date: Jan 15, 2020
//Author: joelcs
//Desc: filesystem logger for node.js
//********************************************* */
//TO USE THIS

// //run and use logger
// const Logger = require('./logger');

// //instantiate the logger obj
// const logger = new Logger();

// logger.on('message', (data) => console.log('Called listener',data));

// logger.log('send a message');

//******************************************** */



const EventEmitter = require('events');
const uuid = require('uuid');


//Class: Logger
//Desc: logger utility 
class Logger extends EventEmitter {

    //https://stackoverflow.com/questions/31067368/how-to-extend-a-class-without-having-to-use-super-in-es6
    constructor(logPath) {
        var superID = uuid.v4() + ':Logger';
        super(superID);
        this.logPath = logPath;
    }

    //Meth: log(msg)
    //Desc: raises event to be handled
    log(msg) {
        //Raise event including uuid and the message passed thru
        this.emit('message', { id: uuid.v4(), msg });
    }
}

module.exports = Logger;

