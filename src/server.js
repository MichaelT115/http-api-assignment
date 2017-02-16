const http = require('http');
const url = require('url');

const responses = require('./responses');

// Gets the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles requests
const onRequest = (request, response) => {
  console.log(request.url);

  const urlObject = url.parse(request.url, true); // This object represents the URL.

  // This gets the title of the URL minus the query field.
  switch (urlObject.pathname) {
    // Default page
    case '/':
      responses.getFile(request, response, '/client.html');
      break;

    // The status pages. These induce status codes.
    case '/success':
    case '/badRequest':
    case '/unauthorized':
    case '/forbidden':
    case '/internal':
    case '/notImplemented':
    case '/notFound':
      responses.handleStatusResponses(request, response, urlObject);
      break;

    // Retrieves all other files. Also handles Resource Not Found conditions.
    default:
      responses.getFile(request, response, urlObject.pathname);
      break;
  }
};

// Creates server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
