const path = require('path');
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
const port = process.env.PORT || 10000;

// --- Данные ---
let users = [
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

let channels = [
  { id: 1, name: 'general', removable: false },
  { id: 2, name: 'random', removable: false },
  { id: 3, name: 'help', removable: false },
];
let nextChannelId = 4;

// --- Middleware ---
app.use(express.json());
const staticDirPath = path.join(__dirname, 'frontend/dist');
app.use(express.static(staticDirPath));

// --- API Маршруты ---

// Каналы
app.get('/api/v1/channels', (req, res) => res.json(channels));

app.post('/api/v1/channels', (req, res) => {
  const { name } = req.body;
  
  // Проверка уникальности имени
  if (channels.some(ch => ch.name === name)) {
    return res.status(400).json({ message: 'Channel name must be unique' });
  }
  
  const newChannel = {
    id: nextChannelId++,
    name,
    removable: true
  };
  channels.push(newChannel);
  io.emit('newChannel', newChannel);
  res.status(201).json(newChannel);
});

app.patch('/api/v1/channels/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const channelId = parseInt(id);
  
  const channel = channels.find(ch => ch.id === channelId);
  if (!channel) {
    return res.status(404).json({ message: 'Channel not found' });
  }
  
  // Проверка уникальности имени
  if (channels.some(ch => ch.name === name && ch.id !== channelId)) {
    return res.status(400).json({ message: 'Channel name must be unique' });
  }
  
  channel.name = name;
  io.emit('renameChannel', channel);
  res.json(channel);
});

app.delete('/api/v1/channels/:id', (req, res) => {
  const { id } = req.params;
  const channelId = parseInt(id);
  
  const channel = channels.find(ch => ch.id === channelId);
  if (!channel) {
    return res.status(404).json({ message: 'Channel not found' });
  }
  
  // Нельзя удалить дефолтные каналы
  if (!channel.removable) {
    return res.status(403).json({ message: 'Cannot remove default channel' });
  }
  
  // Удаляем канал и его сообщения
  channels = channels.filter(ch => ch.id !== channelId);
  messages = messages.filter(msg => msg.channelId !== channelId);
  
  io.emit('removeChannel', channelId);
  res.status(204).send();
});

// Сообщения
app.get('/api/v1/messages', (req, res) => res.json(messages));

app.post('/api/v1/messages', (req, res) => {
  const message = { 
    id: nextMessageId++, 
    ...req.body, 
    createdAt: new Date().toISOString() 
  };
  messages.push(message);
  io.emit('newMessage', message);
  res.status(201).json(message);
});

// Авторизация
app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ 
      token: `jwt-${username}-${Date.now()}`, 
      username: user.username 
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Регистрация
app.post('/api/v1/signup', (req, res) => {
  const { username, password } = req.body;
  
  // Валидация
  if (!username || username.length < 3 || username.length > 20) {
    return res.status(400).json({ message: 'Username must be 3-20 characters' });
  }
  
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  
  // Проверка существования пользователя
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  
  // Добавляем нового пользователя
  const newUser = { username, password };
  users.push(newUser);
  
  // Отправляем приветственное сообщение в general канал
  const welcomeMessage = {
    id: nextMessageId++,
    channelId: 1,
    username: 'System',
    body: `Пользователь ${username} присоединился к чату!`,
    createdAt: new Date().toISOString()
  };
  messages.push(welcomeMessage);
  io.emit('newMessage', welcomeMessage);
  
  res.status(201).json({ 
    token: `jwt-${username}-${Date.now()}`, 
    username 
  });
});

// --- WebSocket ---
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) { 
    // Извлекаем username из токена (в реальном приложении нужно проверять JWT)
    const username = token.split('-')[1] || 'anonymous';
    socket.username = username;
    next(); 
  } else { 
    next(new Error('Authentication error')); 
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.username}`);

  // Отправляем текущие данные при подключении
  socket.emit('channels', channels);
  socket.emit('messages', messages);

  socket.on('newMessage', (message, callback) => {
    const newMessage = { 
      id: nextMessageId++, 
      ...message, 
      username: socket.username, 
      createdAt: new Date().toISOString() 
    };
    messages.push(newMessage);
    io.emit('newMessage', newMessage);
    if (callback) callback({ status: 'ok', id: newMessage.id });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.username}`);
  });
});

// --- ТЕСТОВЫЕ ЭНДПОИНТЫ ДЛЯ ROLLBAR ---
// (добавлено для тестирования ошибок)

// Тестовый эндпоинт для ошибок
app.get('/api/v1/test-error', (req, res) => {
  console.log('🔥 Тестовый эндпоинт ошибки вызван');
  
  const { type = 'server' } = req.query;
  
  try {
    switch(type) {
      case 'server':
        throw new Error('🔥 Тестовая ошибка на сервере для Rollbar');
        
      case 'database':
        const dbError = new Error('Database connection failed');
        dbError.code = 'ECONNREFUSED';
        dbError.statusCode = 503;
        throw dbError;
        
      case 'validation':
        return res.status(400).json({ 
          error: 'Validation failed',
          details: { field: 'username', message: 'Username is required' }
        });
        
      case 'async':
        setTimeout(() => {
          throw new Error('🔥 Асинхронная ошибка на сервере');
        }, 100);
        return res.json({ message: 'Асинхронная ошибка запущена' });
        
      default:
        return res.status(400).json({ error: 'Unknown error type' });
    }
  } catch (error) {
    console.error('Test error caught:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      type: error.name
    });
  }
});

// Тестовый эндпоинт для проверки Rollbar
app.get('/api/v1/rollbar-test', (req, res) => {
  res.json({ 
    message: 'Rollbar test endpoint',
    instructions: {
      client: 'Нажмите кнопки в интерфейсе для тестирования клиентских ошибок',
      server: 'Используйте /api/v1/test-error?type=server для тестирования серверных ошибок'
    }
  });
});

// --- Глобальный обработчик ошибок ---
app.use((err, req, res, next) => {
  console.error('🔥 Global error handler:', err);
  
  console.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    error: err.message || 'Internal Server Error',
    status: statusCode,
    timestamp: new Date().toISOString()
  };
  
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(statusCode).json(errorResponse);
});

// --- Обработчик для React Router ---
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(staticDirPath, 'index.html'));
});

// --- Запуск сервера ---
server.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📁 Static from: ${staticDirPath}`);
  console.log(`📊 Channels: ${channels.length}`);
  console.log(`💬 Messages: ${messages.length}`);
  console.log(`👥 Registered users: ${users.map(u => u.username).join(', ')}`);
  console.log(`🔧 Test endpoints:`);
  console.log(`   - GET /api/v1/test-error?type=server`);
  console.log(`   - GET /api/v1/test-error?type=database`);
  console.log(`   - GET /api/v1/test-error?type=validation`);
  console.log(`   - GET /api/v1/test-error?type=async`);
  console.log(`   - GET /api/v1/rollbar-test`);
});