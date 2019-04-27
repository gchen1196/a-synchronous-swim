const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'GET' && req.url === '/messages') {
    console.log('shift', shifted);
    res.end(messageQueue.dequeue());
  }
  if (req.method === 'POST' && req.url === '/commands') {
    req.on('data', chunk => {
      console.log('chunk', chunk.toString());
      messageQueue.enqueue(chunk);
    })
    req.on('end', () => {});
  }
};

// const options = ['left', 'right', 'up', 'down'];
// const index = Math.floor(Math.random() * 4);
// res.end(options[index]);

