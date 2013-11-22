var PORT = 1234;

var fs      = require('fs');
var server  = require('http').createServer(serverCreated);
var io      = require('socket.io').listen(server); 

server.listen(PORT);

io.sockets.on('connection', function(socket){
	socket.emit('welcome', 'Welcome to chatroom.');
	
	socket.on('login', function(username){
		socket.set('username', username);
	});
	
	socket.on('message', function(message){
		socket.get('username', function(err, username){
			if (!err) {
				socket.emit('message', {username:username, message:message});
			}
		});
	});
});

function serverCreated(request, response) {
	fs.readFile(__dirname + '/index.html', function(err, data){
    	if (err) {
    		response.writeHead(500);
    		return response.end('Error loading index file.');
    	}
    	
    	response.writeHead(200);
    	response.end(data);
    });
}