'use strict';

module.exports = function(server) {
    let io = require('socket.io').listen(server);
    
    io.on('connection', function(socket){
        socket.on('an event', function(data){
            // When UI emits an event with the same name, run this code
            console.log('an event was emitted');
        });
        
        // Emits an event to the UI, with data
        socket.emit('another event', { lolz: 'data' });
        
        socket.on('disconnect', function() {
            console.log('Socket Disconnected');
        });

        console.log('Socket Connected');
    });
};
