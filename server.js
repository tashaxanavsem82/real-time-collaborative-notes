const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Placeholder for routes
app.get('/', (req, res) => {
  res.send('Welcome to Real-time Collaborative Notes!');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle note updates
  socket.on('noteUpdate', (data) => {
    console.log('Note update received:', data); // Added logging for note updates
    socket.broadcast.emit('noteUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});