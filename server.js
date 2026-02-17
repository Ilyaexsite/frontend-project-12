const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// ✅ ПРАВИЛЬНО: используем PORT из окружения Render, или 5001 для локальной разработки
const port = process.env.PORT || 5001;

console.log('='.repeat(60));
console.log('🚀 SERVER STARTING...');
console.log('='.repeat(60));

console.log('📌 PORT:', port);
console.log('📌 NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('📌 __dirname:', __dirname);
console.log('📌 Current directory:', process.cwd());

// Проверяем папку public
const publicPath = path.join(__dirname, 'public');
console.log('\n📁 Public path:', publicPath);
console.log('📁 Public exists:', fs.existsSync(publicPath));

if (fs.existsSync(publicPath)) {
    try {
        const files = fs.readdirSync(publicPath);
        console.log('📁 Public files:', files);
        
        const indexPath = path.join(publicPath, 'index.html');
        const signupPath = path.join(publicPath, 'signup.html');
        
        console.log('📄 index.html exists:', fs.existsSync(indexPath));
        console.log('📄 signup.html exists:', fs.existsSync(signupPath));
        
        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');
            console.log('📄 index.html contains "Hexlet Chat":', content.includes('Hexlet Chat'));
            console.log('📄 index.html contains "Вход":', content.includes('Вход'));
        }
    } catch (error) {
        console.error('❌ Error reading public directory:', error.message);
    }
} else {
    console.log('❌ Public directory not found!');
}

// Middleware для логирования всех запросов
app.use((req, res, next) => {
    console.log(`🌐 ${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Раздаём статические файлы из папки public
app.use(express.static(publicPath));

// Явные маршруты
app.get('/', (req, res) => {
    console.log('📄 Serving index.html for /');
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/login', (req, res) => {
    console.log('📄 Serving index.html for /login');
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/signup', (req, res) => {
    console.log('📄 Serving signup.html for /signup');
    const signupPath = path.join(publicPath, 'signup.html');
    if (fs.existsSync(signupPath)) {
        res.sendFile(signupPath);
    } else {
        console.log('❌ signup.html not found, falling back to index.html');
        res.sendFile(path.join(publicPath, 'index.html'));
    }
});

// Тестовый маршрут для проверки работы сервера
app.get('/ping', (req, res) => {
    console.log('📄 Pong!');
    res.json({ 
        status: 'ok', 
        time: new Date().toISOString(),
        port: port,
        node_version: process.version
    });
});

// Обработка 404 - все остальные маршруты отдают index.html
app.use((req, res) => {
    console.log(`📄 404 - serving index.html for ${req.url}`);
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).send('Internal Server Error');
});

// Запуск сервера
const server = app.listen(port, '0.0.0.0', () => {
    console.log('='.repeat(60));
    console.log(`✅ SERVER RUNNING on http://localhost:${port}`);
    console.log(`🔍 Test: http://localhost:${port}/ping`);
    console.log(`📁 Serving static files from: ${publicPath}`);
    console.log('='.repeat(60));
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

module.exports = app;