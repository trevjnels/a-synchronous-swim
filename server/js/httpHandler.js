const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const http = require('http');
const keypressHandler = require('./keypressHandler.js')
const PORT = 5000;
const messageQueue = require('./messageQueue.js')


// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.dirname("/server/spec/water-lg.jpg") //path.join('.',  'spec', 'water-lg.jpg');
// path.join('.', 'spec', 'missing.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
}) => {
  //
  // if req.method === "GET"
//  res.data'
  var backgroundImage = path.join('.',  'spec', 'water-lg.jpg');
  // console.log("JJJJJJJJJJJJ")
  // console.log("TTTTT " , backgroundImage)
  console.log("req.url: ", req.url, "req.method: ", req.method, "backgroundImage: ", backgroundImage  )

  if(req.method === 'GET' && req.url === '/background.jpg') {

    console.log('LINE 27 is running')

      if (backgroundImage !== 'spec/missing.jpg') {
         var img = fs.readFileSync(backgroundImage);
         console.log("!!!!!! ", backgroundImage)
         res.writeHead(200, {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'access-control-allow-headers': 'content-type, accept',
          'access-control-max-age': 10,
          'Content-Type': 'image/jpg' })
         res.end(img, 'binary');
         next();
      } else {
         res.writeHead(404, headers);
         res.end();
         console.error('ERROR');
         next();
      }
    }


  res._data = [];
  if(req.method === 'GET' && req.url === '/') {
    var message = messageQueue.dequeue();
    if (message !== undefined) {
      res.writeHead(200, headers);
      res.end(message);
    } else {
      res.writeHead(200, headers);
      res.end("");
    }






    // var directions = ['left', 'right', 'up', 'down']
    // var num =  Math.floor(Math.random() * 3);
    // // console.log(res._data, "LINE 72")
    // // while(keypressHandler.message)
    // var direction = directions[num]

		// // console.log("TCL: module.exports.router -> direction", direction)

    // res.writeHead(200, headers);
    // res.end(direction);





  } else {

    res.writeHead(200, headers);
    res.end();
  }
};



// Agent: { [Function: Agent] defaultMaxSockets: Infinity },
//   ClientRequest: [Function: ClientRequest],
//   IncomingMessage: [Function: IncomingMessage],
//   OutgoingMessage: [Function: OutgoingMessage],
//   Server: [Function: Server],
//   ServerResponse: [Function: ServerResponse],
//   createServer: [Function: createServer],
//   get: [Function: get],
//   request: [Function: request],
//   maxHeaderSize: [Getter],
//   globalAgent: [Getter/Setter] }




// { _connectionListener: [Function: connectionListener],
//   METHODS:
//    [ 'ACL',
//      'BIND',
//      'CHECKOUT',
//      'CONNECT',
//      'COPY',
//      'DELETE',
//      'GET',
//      'HEAD',
//      'LINK',
//      'LOCK',
//      'M-SEARCH',
//      'MERGE',
//      'MKACTIVITY',
//      'MKCALENDAR',
//      'MKCOL',
//      'MOVE',
//      'NOTIFY',
//      'OPTIONS',
//      'PATCH',
//      'POST',
//      'PROPFIND',
//      'PROPPATCH',
//      'PURGE',
//      'PUT',
//      'REBIND',
//      'REPORT',
//      'SEARCH',
//      'SOURCE',
//      'SUBSCRIBE',
//      'TRACE',
//      'UNBIND',
//      'UNLINK',
//      'UNLOCK',
//      'UNSUBSCRIBE' ],
//   STATUS_CODES:
//    { '100': 'Continue',
//      '101': 'Switching Protocols',
//      '102': 'Processing',
//      '103': 'Early Hints',
//      '200': 'OK',
//      '201': 'Created',
//      '202': 'Accepted',
//      '203': 'Non-Authoritative Information',
//      '204': 'No Content',
//      '205': 'Reset Content',
//      '206': 'Partial Content',
//      '207': 'Multi-Status',
//      '208': 'Already Reported',
//      '226': 'IM Used',
//      '300': 'Multiple Choices',
//      '301': 'Moved Permanently',
//      '302': 'Found',
//      '303': 'See Other',
//      '304': 'Not Modified',
//      '305': 'Use Proxy',
//      '307': 'Temporary Redirect',
//      '308': 'Permanent Redirect',
//      '400': 'Bad Request',
//      '401': 'Unauthorized',
//      '402': 'Payment Required',
//      '403': 'Forbidden',
//      '404': 'Not Found',
//      '405': 'Method Not Allowed',
//      '406': 'Not Acceptable',
//      '407': 'Proxy Authentication Required',
//      '408': 'Request Timeout',
//      '409': 'Conflict',
//      '410': 'Gone',
//      '411': 'Length Required',
//      '412': 'Precondition Failed',
//      '413': 'Payload Too Large',
//      '414': 'URI Too Long',
//      '415': 'Unsupported Media Type',
//      '416': 'Range Not Satisfiable',
//      '417': 'Expectation Failed',
//      '418': "I'm a Teapot",
//      '421': 'Misdirected Request',
//      '422': 'Unprocessable Entity',
//      '423': 'Locked',
//      '424': 'Failed Dependency',
//      '425': 'Unordered Collection',
//      '426': 'Upgrade Required',
//      '428': 'Precondition Required',
//      '429': 'Too Many Requests',
//      '431': 'Request Header Fields Too Large',
//      '451': 'Unavailable For Legal Reasons',
//      '500': 'Internal Server Error',
//      '501': 'Not Implemented',
//      '502': 'Bad Gateway',
//      '503': 'Service Unavailable',
//      '504': 'Gateway Timeout',
//      '505': 'HTTP Version Not Supported',
//      '506': 'Variant Also Negotiates',
//      '507': 'Insufficient Storage',
//      '508': 'Loop Detected',
//      '509': 'Bandwidth Limit Exceeded',
//      '510': 'Not Extended',
//      '511': 'Network Authentication Required' },