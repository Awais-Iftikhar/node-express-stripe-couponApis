const http = require('http');

const port = process.env.PORT || 8081;

const server = http.createServer((req,res,next) => {
    console.log('req');

})
 server.listen(port);