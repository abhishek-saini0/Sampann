const http = require("http");
const express = require('express');
const app = require('./app.js');
const server = http.createServer(app);
const PORT = 10000;


const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
// const mongoURI = "mongodb+srv://abhishek331saini:8AfXVI3SStYHX77t@sampann.gbm9a.mongodb.net/?retryWrites=true&w=majority&appName=Sampann";

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
 
 

 


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



