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

//checks for sets to either config setting or finds auto
const PORT = configObj.port || process.env.PORT;


try {
    if (!fs.existsSync(logPath)) {
        //file does not exist exists
        fs.writeFile(path.join(path.join(__dirname, logPath)), '{msg: \'serverlog started\'}\n', err => {
     if (err) throw err;
 });
    }
}
    catch(err)
    {
        console.error(err);
    }


//link logger emitter to append to preferred file
//this type of file-logging does not work on heroku
// logger.on('message', (data) => 
//     fs.appendFile(path.join(__dirname, logPath), JSON.stringify(data) + '\n', err =>{
//      if (err) throw err;}
    
//  ));


//this logging type on Heroku
 logger.on('message', (data) => console.log('Called listener', data));

//make our web server
const server = http.createServer((req, res) => {

    //get the requested filepath. browser requests
    //homepage '/', feed them index.html
    let filePath = path.join(
        __dirname,
        'public',
        req.url == '/' ? 'default.html' : req.url
    );



    //figure out extension for file
    let extname = path.extname(filePath);

    //initial content type
    let contentType = 'text/html';





    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;

        //image types
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.jpeg':
            contentType = 'image/jpg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }

    //read the file to be served
    //read file
    fs.readFile(filePath, (err, contents) => {
        if (err) {
            //error will have property code
            if (err.code = 'ENOENT') {
                //page not found
                fs.readFile(path.join(__dirname, '/public', '404.html'), (err, contents) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(contents, 'utf8');
                })
            } else {
                //some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            //success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(contents, 'utf8');
        }
    });

})

//initialize server
server.listen(PORT, () => logger.log(`server running on port ${PORT}`));



