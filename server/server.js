require('rootpath')();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Use JWT auth to secure API
app.use(jwt());

// API routes
app.use('/users', require('./users/users.controller'));
app.use('/requests', require('./requests/request.controller'));

// Error handler
app.use(errorHandler);

// Start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = http.Server(app);
server.listen(port, function() {
    console.log('Server is listening on port ' + port);
});

const io = socketIo(server);
const userList = [];

io.on('connection', (socket) => { 
    socket.on('room', (room) => {
        socket.join(room);
    });

    socket.on('login', (username, socketID) => {
        userList.push({username: username, socketID: socketID});
        console.log(userList);
    });

    socket.on('acceptRequest', (proParam, roomID) => {
        userList.push(proParam);

        let len = userList.length;
        len--;
        io.to(roomID).emit('userList', proParam.username); 
    });

    //socket.to('member').emit('connectToRoom', "You are in the member room");
    //socket.to('professional').emit('connectToRoom', "You are in the professional room");
})