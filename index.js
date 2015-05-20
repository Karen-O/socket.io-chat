var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io');
var io = io(http);

app.set("view engine", "hbs");

app.get('/', function(req, res){
  res.render("index");
});

io.on('connection', function(socket){
  socket.on("chatsend", function(message){
    io.emit("chatpost", message);
  });
});

http.listen(3000);
