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
  if (req.method === 'GET' && req.url === '/messages') {
    res.writeHead(200, headers);
    res.write(messageQueue.dequeue());
  }
  else if (req.method === 'POST' && req.url === '/commands') {
    res.writeHead(200, headers);
    req.on('data', chunk => {
      console.log('chunk', chunk.toString());
      messageQueue.enqueue(chunk);
    })
    req.on('end', () => {});
  }
  else if (req.method === "GET" && req.url === '/background.jpg') {
    //console.log('path', backgroundImageFile);
    fs.readFile('./background.jpg', (err, img) => {
      if (err) throw err;
      let newImg = multipart.getFile(img);
      console.log('new image:', img);
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(img);
    });
  }
  res.end();
};

// const options = ['left', 'right', 'up', 'down'];
// const index = Math.floor(Math.random() * 4);
// res.end(options[index]);

