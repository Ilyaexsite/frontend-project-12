const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// API маршруты
app.get('/api/v1/channels', (req, res) => {
  res.json([
    { id: 1, name: 'general', removable: false },
    { id: 2, name: 'random', removable: false },
    { id: 3, name: 'help', removable: false }
  ]);
});

app.get('/api/v1/messages', (req, res) => {
  res.json([]);
});

app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ token: 'fake-jwt-token', username: 'admin' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// React Router - все остальные пути на index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
  }
});

app.listen(port, () => console.log(`Server on ${port}`));
