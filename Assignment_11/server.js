var http = require('http');

var finalhandler =  require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./");

var server = http.createServer(function(req, res){
	var done = finalhandler(req, res);
	serve(req, res, done);
});

server.listen(8890);
console.log("server is runnning:8890");