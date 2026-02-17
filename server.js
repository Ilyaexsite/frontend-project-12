const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5001;

const publicPath = path.join(__dirname, 'public');
console.log('📁 Public path:', publicPath);
console.log('📁 Public exists:', fs.existsSync(publicPath));

if (fs.existsSync(publicPath)) {
    console.log('📁 Public files:', fs.readdirSync(publicPath));
}

// Отдаём статику
app.use(express.static(publicPath));

// Обработка разных маршрутов
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(publicPath, 'signup.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Для всех остальных запросов - index.html
app.use((req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});