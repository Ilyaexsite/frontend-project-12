const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5001;

const publicPath = path.join(__dirname, 'public');
const indexPath = path.join(publicPath, 'index.html');

// Проверяем существование файла
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found at:', indexPath);
  process.exit(1);
}

console.log('✅ index.html found at:', indexPath);

// Отдаем статические файлы
app.use(express.static(publicPath));

// Middleware для всех запросов
app.use((req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});