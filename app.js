var io = require('socket.io')(process.env.PORT || 5000);
var shortid = require("shortid");
var players = [];
var playerCount = 0;
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
    socket.broadcast.emit('spawn', {id:thisPlayerId});
    console.log("SERVER LOG: Sending spawn to new with ID", thisPlayerId);
    console.log("players array length: ", players.length);

    for(var i = 0; i < playerCount; i++){
        socket.emit('spawn');

        PlayerCount++;
    }

    socket.on('sayhello', function(data){
        console.log("SERVER LOG: Unity Game says hello");
        socket.emit('talkback');
    });


    socket.on('disconnect', function(){
        console.log("SERVER LOG: Player Disconnected");
        //playerCount--;
    })

    socket.on('move', function(data){
        data.id = thisPlayerId;
        //console.log('Player has Moved', JSON.stringify(data));
        socket.broadcast.emit('move', data);
    });

    console.log("SERVER LOG--> Number of players connected: " + players.length)
});