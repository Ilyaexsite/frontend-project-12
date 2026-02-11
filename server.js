const path = require('path');
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 10000;

// Тестовые пользователи
const users = [
  { username: 'admin', password: 'admin' },
  { username: 'alice', password: 'alice123' },
  { username: 'bob', password: 'bob123' },
  { username: 'charlie', password: 'charlie123' },
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Сообщения в памяти
let messages = [
  { 
    id: 1, 
    channelId: 1, 
    username: 'admin', 
    body: 'Добро пожаловать в чат!', 
    createdAt: new Date().toISOString() 
  },
  { 
    id: 2, 
    channelId: 1, 
    username: 'alice', 
    body: 'Привет всем!', 
    createdAt: new Date().toISOString() 
  },
  { 
    id: 3, 
    channelId: 1, 
    username: 'bob', 
    body: 'Как дела?', 
    createdAt: new Date().toISOString() 
  },
];

let nextMessageId = 4;

// Каналы
const channels = [
  { id: 1, name: 'general', removable: false },
  { id: 2, name: 'random', removable: false },
  { id: 3, name: 'help', removable: false },
];

// API маршруты
app.get('/api/v1/channels', (req, res) => {
  res.json(channels);
});

app.get('/api/v1/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/v1/messages', (req, res) => {
  const message = {
    id: nextMessageId++,
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  messages.push(message);
  
  // Отправляем через WebSocket всем клиентам
  io.emit('newMessage', message);
  
  res.status(201).json(message);
});

app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({
      token: `jwt-token-${username}-${Date.now()}`,
      username: user.username
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// WebSocket соединения
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    // В реальном приложении здесь проверка JWT
    socket.username = token.split('-')[2] || 'anonymous';
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.username}`);

  socket.on('newMessage', (message, callback) => {
    const newMessage = {
      id: nextMessageId++,
      ...message,
      username: socket.username,
      createdAt: new Date().toISOString(),
    };
    
    messages.push(newMessage);
    io.emit('newMessage', newMessage);
    
    if (callback) {
      callback({ status: 'ok', id: newMessage.id });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.username}`);
  });
});

// React Router - все остальные пути на index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

server.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, 'frontend/dist')}`);
  console.log(`🔌 WebSocket server ready`);
  console.log(`👥 Test users: ${users.map(u => u.username).join(', ')}`);
});
