const http= require('http');
const server =http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello from server ! \n');

});
server.listen(3001,'127.0.0.1',()=>{
    console.log('server running at http://127.0.0.1:3001/');
});