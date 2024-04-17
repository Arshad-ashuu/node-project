const http = require('http');
const fs = require('fs');
const path = require('path');

// Set the port to listen on
const PORT = 3000;

// Creating a server using http
const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  // Handle specific routes using switch casee
  switch (filePath) {
    case './':
      filePath = './home.html';
      break;
    case './about':
      filePath = './about.html';
      break;
    case './contact':
      filePath = './contact.html';
      break;
    case '/*':
        filePath = './fof.html';
        break;  

    default:
      break;
  }

  // Get the file extension
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  console.log(contentType);

  // Set content type based on file extension
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found, serve 404 page
        fs.readFile('./fof.html', (err, notFoundContent) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(notFoundContent);
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success, serve the file with appropriate content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

// Start the server at PORT 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
