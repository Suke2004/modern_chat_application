require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());

app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/authRoutes'));
app.use('/chat', require('./routes/chatRoutes'));
app.use('/profile', require('./routes/profileRoutes'));
app.use('/code', require('./routes/codeRoutes'));


// Socket.io connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });