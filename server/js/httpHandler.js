const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {

  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  console.log(req);
  if (req.method === 'GET' && req.url === '/commands') {
    const options = ['left', 'right', 'up', 'down'];
    const index = Math.floor(Math.random() * 4);
    res.end(options[index]);
  }
  res.end();
};
