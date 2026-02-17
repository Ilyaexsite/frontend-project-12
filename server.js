const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Отдаём статику
app.use(express.static(path.join(__dirname, 'public')));

// Обработка маршрутов
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});