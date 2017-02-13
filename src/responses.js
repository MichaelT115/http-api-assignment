const fs = require('fs');       // File system module
const path = require('path');   // Path module

// Maps extensions to content-types
const extToType = {
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.html': 'text/html',
  '.css': 'text/css',
};

const getFile = (request, response, fileName) => {
  const filePath = path.resolve(`${__dirname}/../client/`, `./${fileName}`);
  const fileExt = path.extname(filePath);
  
  fs.readFile(filePath, (err, data) => {
    if(err) {
      return;
    }
    
    response.writeHead(200, { 'Content-Type': extToType[fileExt] });
    response.write(data);
    response.end();
  });
};

module.exports.getFile = getFile;
