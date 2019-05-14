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

// Map of active (online) users
const activeUsers = new Map();

io.on('connection', (socket) => {
    
    // User joins a room when they accept a request or make a request, this is so realtime data can be sent between the members and professionals
    // TODO: Possibly can get rid of this since we are keeping a map of each user and their socketid
    socket.on('room', (room) => {
        socket.join(room);
    });

    // When a user connects to the website add their username and their socketID to the activeUsers map (socketID is kept updated over page refreshes)
    socket.on('userConnected', (username, socketID) => {
        activeUsers.set(username, socketID);
        console.log(username + ' ' + socketID);

        // Print to console all of the connected users
        /*for (const [k, v] of activeUsers) {
            console.log(k, v);
        }*/
    });

    // TODO: Instead of io.to(room), this could just be emitted to the member who requested the service *MAYBE*
    socket.on('acceptRequest', (proParam, roomID) => {
        io.to(roomID).emit('activeUsers', proParam.username); 
    });

    // When a member selects which professional they want to respond to their request, retrieve their socketID from the map
    // and notify them of the acceptance
    // TODO: Notify other professionals that their response has be rejected
    socket.on('chooseProfessional', (username, requestID) => {
        //activeUsers.get(username);
        io.to(`${activeUsers.get(username)}`).emit('serviceAccepted', requestID);
    });
})