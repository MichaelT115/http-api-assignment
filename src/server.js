const http = require('http');
const url = require('url');

const responses = require('./responses');

// Gets the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Handles requests
const onRequest = (request, response) => {
  console.log(request.url);

  const urlObject = url.parse(request.url, true);

  console.log(urlObject);
  console.log(urlObject.query);
  console.log(request.headers);
  

  switch (urlObject.pathname) {
    case '/':
      responses.getFile(request, response, '/client.html');
      break;
    case '/success':
    case '/badrRequest':
    case 'unauthroized':
    case '/forbidden':
    case '/internal':
    case '/notImpemented':
    case '/notFound':
      responses.handleStatusCalls(request, response, urlObject.pathname);
      break;
    default:
      responses.getFile(request, response, urlObject.pathname);
      break;
  }
};

// Creates server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
