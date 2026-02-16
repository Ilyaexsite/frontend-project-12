const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5001;

// Путь к статическим файлам
const staticDirPath = path.join(__dirname, 'frontend/dist');

// Отладочная информация
console.log('🔍 Static directory path:', staticDirPath);
console.log('🔍 Directory exists:', fs.existsSync(staticDirPath));

if (fs.existsSync(staticDirPath)) {
  console.log('🔍 Files in dist:', fs.readdirSync(staticDirPath));
}

// Раздаем статические файлы
app.use(express.static(staticDirPath));

// ✅ ВАРИАНТ 1: Используем middleware вместо маршрута (РЕКОМЕНДУЕТСЯ)
app.use((req, res) => {
  // Пропускаем запросы к API (если есть)
  if (req.url.startsWith('/api')) {
    return res.status(404).json({ error: 'API not found' });
  }
  
  // Отдаем index.html для всех остальных запросов
  const indexPath = path.join(staticDirPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('❌ index.html not found at:', indexPath);
    res.status(500).send('Application not built properly');
  }
});

// ✅ ВАРИАНТ 2: Если нужен явный маршрут (альтернатива)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(staticDirPath, 'index.html'));
// });

app.listen(port, () => {
  console.log(`✅ Test server running on port ${port}`);
  console.log(`🌍 Open http://localhost:${port} in browser`);
});