const path = require('path');
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
const port = process.env.PORT || 10000;

// --- Данные ---
const users = [
  { username: 'admin', password: 'admin' },
  { username: 'alice', password: 'alice123' },
  { username: 'bob', password: 'bob123' },
  { username: 'charlie', password: 'charlie123' },
];

let messages = [
  { id: 1, channelId: 1, username: 'admin', body: 'Добро пожаловать в чат!', createdAt: new Date().toISOString() },
  { id: 2, channelId: 1, username: 'alice', body: 'Привет всем!', createdAt: new Date().toISOString() },
];
let nextMessageId = 3;

const channels = [
  { id: 1, name: 'general', removable: false },
  { id: 2, name: 'random', removable: false },
  { id: 3, name: 'help', removable: false },
];

// --- Middleware ---
app.use(express.json());
const staticDirPath = path.join(__dirname, 'frontend/dist');
app.use(express.static(staticDirPath));

// --- API Маршруты ---
app.get('/api/v1/channels', (req, res) => res.json(channels));
app.get('/api/v1/messages', (req, res) => res.json(messages));
app.post('/api/v1/messages', (req, res) => {
  const message = { id: nextMessageId++, ...req.body, createdAt: new Date().toISOString() };
  messages.push(message);
  io.emit('newMessage', message);
  res.status(201).json(message);
});
app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  user ? res.json({ token: `jwt-${username}-${Date.now()}`, username }) : res.status(401).json({ message: 'Invalid credentials' });
});

// --- WebSocket ---
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) { socket.username = token.split('-')[1] || 'anonymous'; next(); }
  else { next(new Error('Authentication error')); }
});
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.username}`);
  socket.on('newMessage', (message, callback) => {
    const newMessage = { id: nextMessageId++, ...message, username: socket.username, createdAt: new Date().toISOString() };
    messages.push(newMessage);
    io.emit('newMessage', newMessage);
    if (callback) callback({ status: 'ok', id: newMessage.id });
  });
  socket.on('disconnect', () => console.log(`User disconnected: ${socket.username}`));
});

// ✅ ЕДИНСТВЕННЫЙ ПРАВИЛЬНЫЙ ОБРАБОТЧИК ДЛЯ REACT ROUTER (НЕ ИСПОЛЬЗУЙТЕ app.get)
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(staticDirPath, 'index.html'));
});

server.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📁 Static from: ${staticDirPath}`);
  console.log(`👥 Test users: ${users.map(u => u.username).join(', ')}`);
});
