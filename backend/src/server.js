const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id: userId } = socket.handshake.query;
  connectedUsers[userId] = socket.id;
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-gbcth.mongodb.net/omnistack9?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

const portRunning = process.env.PORT || 3333;

server.listen(portRunning);
// app.listen(portRunning);

console.log('portRunning: ', portRunning);
