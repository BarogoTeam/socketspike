var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
    socket.on('chat message', function(id, data){
      console.log(id + '/' + data);
      io.emit('chat message', `[${id}] ${data}`);
    });
});

http.listen(4000, function(){
  console.log('listening on *:3000');
});