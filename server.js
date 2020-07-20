const http = require('http');
const app = require('./express/app');
const port = process.env.PORT || 8081;
app.set('port' , port);

const server = http.createServer(app);
 server.listen(port,() => {
     console.log('running from port' +port);
 });