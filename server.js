const express = require('express');
const app = express();
const http = require('node:http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Serve static files
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected');

  // Simply relay audio data back to the client
  socket.on('sendAudioToServer', (audioData) => {
    socket.emit('sendAudioToClient', audioData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
