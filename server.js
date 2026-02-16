const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 5001;

// Раздаем статические файлы из папки dist
const staticDirPath = path.join(__dirname, 'frontend/dist');
app.use(express.static(staticDirPath));

// Все запросы направляем на index.html (для React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDirPath, 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`✅ Test server running on port ${port}`);
  console.log(`📁 Serving static files from: ${staticDirPath}`);
});
