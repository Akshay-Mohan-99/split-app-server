require('dotenv').config();
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const internalRouter = require('./routes/internal');
const authRouter = require('./routes/auth');
const groupRouter = require('./routes/groups');
const { connectToDB } = require('./db');
const passport = require('passport');
require('./passport/index')(passport);

// create app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configure routes
app.use('/api/internal', internalRouter);
app.use('/api/auth', authRouter);
app.use('/api/group', groupRouter);

//connect to the DB
connectToDB().then(() => {
  console.log("Database connected and sync'd");
  const server = http.createServer(app);
  const port = process.env.PORT || 8080;

  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('A Connection has been made');
    socket.on('disconnect', () => {
      console.log('A disconnection has been made');
    });
  });

  server.listen(port, async () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
