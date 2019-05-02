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
app.use('/members', require('./members/members.controller'));
app.use('/requests', require('./requests/request.controller'));

// Error handler
app.use(errorHandler);

// Start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = http.Server(app);
server.listen(port, function() {
    console.log('Server is listening on port ' + port);
});

/*const server = app.listen(port, function () {
    console.log('Server is listening on port ' + port);
});*/

const io = socketIo(server);

/*io.on('connection', (socket) => {

});*/