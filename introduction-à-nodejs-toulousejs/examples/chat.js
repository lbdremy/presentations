var net = require('net');

var sockets = [];
var server = net.createServer(function(socket){
   sockets.push(socket);
   socket.on('end',function(){
      var i = sockets.indexOf(socket);
      sockets.splice(i,1);
   });
   socket.on('data',function(data){
      var j = sockets.indexOf(socket);
      for(var i = 0; i < sockets.length; i++){
         if(i != j) sockets[i].write(data);
      }
   });
});

server.listen(6000,function() {
  address = server.address();
  console.log("opened server on %j", address);
});
