const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5001; // Фиксированный порт для тестов

console.log('='.repeat(60));
console.log('🧪 TEST SERVER STARTING...');
console.log('='.repeat(60));

// Проверяем папку public
const publicPath = path.join(__dirname, 'public');
console.log('📁 Public path:', publicPath);
console.log('📁 Public exists:', fs.existsSync(publicPath));

if (fs.existsSync(publicPath)) {
    const files = fs.readdirSync(publicPath);
    console.log('📁 Public files:', files);
}

// Раздаём статику
app.use(express.static(publicPath));

// Маршруты
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(publicPath, 'signup.html'));
});

// Тестовый маршрут
app.get('/ping', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
    console.log('='.repeat(60));
    console.log(`✅ TEST SERVER RUNNING on port ${port}`);
    console.log(`📁 Serving from: ${publicPath}`);
    console.log('='.repeat(60));
});