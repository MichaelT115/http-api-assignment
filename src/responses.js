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
  '.xml': 'text/xml',
};

// Preload 404 page.
const page404 = fs.readFileSync(`${__dirname}/../client/responses/notFound.json`);

const getFile = (request, response, fileName) => {
  const filePath = path.resolve(`${__dirname}/../client/`, `./${fileName}`);
  const fileExt = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    // Handle error
    if (err) {
      // Gets 404 page for missing resource.
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.write(page404);
      response.end();
      return;
    }

    // Sends back the data.
    response.writeHead(200, { 'Content-Type': extToType[fileExt] });
    response.write(data);
    response.end();
  });
};

// Handles the requests to get the error status codes.
const handleStatusResponses = (request, response, urlObject) => {
  const pathName = urlObject.pathname;  // Gets the path name in the URL
  const query = urlObject.query;  // Gets the query
  const fileExt = request.headers.accept === 'text/xml' ? '.xml' : '.json'; // Find the file extension based off the Accept header

  // Handles each case of a status page
  // Finds the corresponding file and writes it onto the response.
  let responseFile;
  switch (pathName) {
    // A successful page
    case '/success':
      getFile(request, response, `responses/success${fileExt}`);  // We can load this one normally
      break;

    // Handle bad request page.
    case '/badRequest':
      // If the "valid" field is  there and true.
      if (query.valid && query.valid === 'true') {
        getFile(request, response, `responses/badRequestValid${fileExt}`);
      } else {
        response.writeHead(400, { 'Content-Type': request.headers.accept });
        responseFile = fs.readFileSync(`${__dirname}/../client/responses/badRequest${fileExt}`);
        response.write(responseFile);
        response.end();
      }
      break;

    // Handle unauthorized page.
    case '/unauthorized':
    // if there is a "loggedIn" field and it is equal to "yes"
      if (query.loggedIn && query.loggedIn === 'yes') {
        getFile(request, response, `responses/unauthorizedValid${fileExt}`);
      } else {
        response.writeHead(401, { 'Content-Type': request.headers.accept });
        responseFile = fs.readFileSync(`${__dirname}/../client/responses/unauthorized${fileExt}`);
        response.write(responseFile);
        response.end();
      }
      break;

      // Handle forbidden page
    case '/forbidden':
      response.writeHead(403, { 'Content-Type': request.headers.accept });
      responseFile = fs.readFileSync(`${__dirname}/../client/responses/forbidden${fileExt}`);
      response.write(responseFile);
      response.end();
      break;

      // Handle internal page
    case '/internal':
      response.writeHead(500, { 'Content-Type': request.headers.accept });
      responseFile = fs.readFileSync(`${__dirname}/../client/responses/internal${fileExt}`);
      response.write(responseFile);
      response.end();
      break;

      // Handle notImplemented page
    case '/notImplemented':
      response.writeHead(501, { 'Content-Type': request.headers.accept });
      responseFile = fs.readFileSync(`${__dirname}/../client/responses/notImplemented${fileExt}`);
      response.write(responseFile);
      response.end();
      break;

      // Handle remaining pages - All should be NOT FOUND (404)
    default:
      response.writeHead(404, { 'Content-Type': request.headers.accept });
      responseFile = fs.readFileSync(`${__dirname}/../client/responses/notFound${fileExt}`);
      response.write(responseFile);
      response.end();
      break;
  }
};

module.exports.getFile = getFile;
module.exports.handleStatusResponses = handleStatusResponses;
