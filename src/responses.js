const fs = require('fs');       // File system module
const path = require('path');   // Path module

// Maps extensions to content-types
const extToType = {
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.html': 'text/html',
  '.css': 'text/css',
  '.json': 'application/json',
  '.js': 'application/javascript',
};

const page404 = fs.readFileSync(`${__dirname}/../client/responses/notFound.json`);

const getFile = (request, response, fileName) => {
  const filePath = path.resolve(`${__dirname}/../client/`, `./${fileName}`);
  const fileExt = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': extToType['.json'] });
      response.write(page404);
      response.end();

      return;
    }

    response.writeHead(200, { 'Content-Type': extToType[fileExt] });
    response.write(data);
    response.end();
  });
};

const handleStatusCalls = (request, response, fileName) => {
  const pathName = urlObject.pathname;
  const query = urlObject.query;

  console.log(path.basename(pathName, fileExt));
  switch (pathName) {
    case '/badRequest.json':
      if (!query.valid) {
        response.writeHead(400, { 'Content-Type': extToType[fileExt] });
        const responseFile = fs.readFileSync(`${__dirname}/../client/responses/badRequest${fileExt}`);
        response.write(responseFile);
        response.end();
      } else {
        response.writeHead(200, { 'Content-Type': extToType[fileExt] });
        const responseFile = fs.readFileSync(`${__dirname}/../client/responses/badRequestValid${fileExt}`);
        response.write(responseFile);
        response.end();
      }
      break;
    case '/unauthorized.json':
      if (!query.loggedIn || query.loggedIn !== 'yes') {
        console.log('Test Invalid');
        response.writeHead(400, { 'Content-Type': extToType[fileExt] });
        const responseFile = fs.readFileSync(`${__dirname}/../client/responses/unathorized${fileExt}`);
        response.write(responseFile);
        response.end();
      } else {
        console.log('Test Valid');
        response.writeHead(200, { 'Content-Type': extToType[fileExt] });
        const responseFile = fs.readFileSync(`${__dirname}/../client/responses/unathorizedValid${fileExt}`);
        response.write(responseFile);
        response.end();
      }
      break;
  }
};

module.exports.getFile = getFile;
module.exports.handleStatusCalls = handleStatusCalls;
