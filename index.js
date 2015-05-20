var express = require('express');
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io');
var io = io(http);

mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;
var Chat = mongoose.model("Chat", new mongoose.Schema({
  content: "string"
}));

app.set("view engine", "hbs");

app.get('/', function(req, res){
  var query = Chat.find().lean().exec(function(err, chats){
    res.render("index", {chats: chats});
  });
});

io.on('connection', function(socket){

  socket.on("chatsend", function(message){
    io.emit("chatpost", message);
    var chat = new Chat({ content: message });
    chat.save();
  });

  socket.on("chatdelete", function(id){
    Chat.find({_id: id}).remove().exec();
  });

});

http.listen(3000);
