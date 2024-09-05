const http = require("http");
const express = require('express');
const app = require('./app.js');
const server = http.createServer(app);
const PORT = 8080;




const { Server } = require('socket.io');
 const path = require('path');

 const io = new Server(server);



io.on('connection', (socket) => {
    console.log('a user connected');

    // Broadcast incoming messages to all clients
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(PORT, (startupError) => {
    if (startupError) {
        console.error('Failed to start server:', startupError);
        return;
    }
    console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'Reason:', reason);
});

process.on('uncaughtException', (uncaughtError) => {
    console.error('Uncaught Exception thrown:', uncaughtError);
    process.exit(1); 
});



