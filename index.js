const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const chat = require('./chat.js')

app.get('/', function(req, res){
  res.send('Welcome Abroad')
});
app.get('/:fid/:tid', chat.newChat)

io.on('connection', function(socket){
  socket.on('chatId', function(msg,fid,tid){
    io.emit(`chatId_${fid}${tid}`, msg);
    io.emit(`chatId_${tid}${fid}`, msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
