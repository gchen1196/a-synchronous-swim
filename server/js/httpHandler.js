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
  // if (req.method === 'GET' && req.url === '/commands') {
  //   const options = ['left', 'right', 'up', 'down'];
  //   const index = Math.floor(Math.random() * 4);
  //   res.end(options[index]);
  // }
  req.on('data', chunk => {
    messageQueue.enqueue(chunk);
  })
  req.on('end', () => {

  });
};


