const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// const connectedUsers = {};

// io.on('connection', socket => {
//   const { user } = socket.handshake.query;

//   connectedUsers[user] = socket.id;
// });

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-gbcth.mongodb.net/omnistack9?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// app.use((req, res, next) => {
//   req.io = io;
//   req.connectedUsers = connectedUsers;
//   return next();
// });

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

const portRunning = process.env.PORT || 3333;

// server.listen(portRunning);
app.listen(portRunning);

console.log('portRunning: ', portRunning);
