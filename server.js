const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5001;

console.log('='.repeat(50));
console.log('🚀 SERVER STARTING...');
console.log('='.repeat(50));

console.log('📌 PORT:', port);
console.log('📌 __dirname:', __dirname);
console.log('📌 Current directory:', process.cwd());

// Проверяем папку public
const publicPath = path.join(__dirname, 'public');
console.log('📁 Public path:', publicPath);
console.log('📁 Public exists:', fs.existsSync(publicPath));

if (fs.existsSync(publicPath)) {
    console.log('📁 Public files:', fs.readdirSync(publicPath));
    
    const indexPath = path.join(publicPath, 'index.html');
    console.log('📄 Index exists:', fs.existsSync(indexPath));
}

// Middleware для логирования всех запросов
app.use((req, res, next) => {
    console.log(`🌐 ${req.method} ${req.url}`);
    next();
});

// Раздаём статику
app.use(express.static(publicPath));

// Маршруты
app.get('/', (req, res) => {
    console.log('📄 Serving index.html');
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/login', (req, res) => {
    console.log('📄 Serving index.html for /login');
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/signup', (req, res) => {
    console.log('📄 Serving signup.html');
    res.sendFile(path.join(publicPath, 'signup.html'));
});

// Тестовый маршрут
app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(port, () => {
    console.log('='.repeat(50));
    console.log(`✅ SERVER RUNNING on http://localhost:${port}`);
    console.log(`🔍 Test: http://localhost:${port}/ping`);
    console.log('='.repeat(50));
});