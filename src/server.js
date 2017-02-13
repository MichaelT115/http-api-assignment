const http = require('http');
const responses = require('./responses');

// Gets the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles requests
const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      responses.getFile(request, response, '/client.html');
      break;
    default:
      responses.getFile(request, response, request.url);
      break;
  }
};

// Creates server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
