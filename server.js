const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Placeholder for routes
app.get('/', (req, res) => {
  res.send('Welcome to Real-time Collaborative Notes!');
});

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`); // Include socket ID in the log

  // Handle note updates
  socket.on('noteUpdate', (data) => {
    console.log(`Note update received:`, data); // Added logging for note updates
    socket.broadcast.emit('noteUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`); // Include socket ID in the log
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});