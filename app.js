var io = require('socket.io')(process.env.PORT || 5000);
var shortid = require("shortid");
var players = [];
console.log("Server Running");

io.on('connection', function(socket){
    console.log("Connected to Unity");
    var thisPlayerId = shortid.generate();

    var player = {
        id:thisPlayerId,
        position:{
            v:0
        }
    }

    players[thisPlayerId] = player;
    socket.emit('register', {id:thisPlayerId});
    socket.broadcast.emit('spawn', {id:thisPlayerId});
    console.log("SERVER LOG: Sending spawn to new with ID", thisPlayerId);
    console.log("players array length: ", players.length);

    for(var i = 0; i < playerCount; i++){
        if(playerId)
        continue;
        socket.emit('spawn', players[playerId]);
        console.log('Sending spawn to new with ID', thisPlayerId);
    }

    socket.on('sayhello', function(data){
        console.log("SERVER LOG: Unity Game says hello");
        socket.emit('talkback');
    });


    socket.on('disconnect', function(){
        console.log("SERVER LOG: Player Disconnected");
        delete players[thisPlayerId];
        socket.broadcast.emit('disconnected', {id:thisPlayerId});
    })

    socket.on('move', function(data){
        data.id = thisPlayerId;
        //console.log('Player has Moved', JSON.stringify(data));
        socket.broadcast.emit('move', data);
    });

    socket.on('updatePosition', function(data){
        data.id = thisPlayerId;
        socket.broadcast.emit('updatePosition', data);
    });

    console.log("SERVER LOG--> Number of players connected: " + players.length)
});