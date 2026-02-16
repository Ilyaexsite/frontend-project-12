const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5001;

console.log('='.repeat(50));
console.log('🔍 DEBUG INFO');
console.log('='.repeat(50));

// Проверяем текущую директорию
console.log('📁 Current directory:', __dirname);
console.log('📁 Files in root:', fs.readdirSync(__dirname));

// Проверяем frontend/dist
const distPath = path.join(__dirname, 'frontend/dist');
console.log('📁 Dist path:', distPath);
console.log('📁 Dist exists:', fs.existsSync(distPath));

if (fs.existsSync(distPath)) {
  console.log('📁 Dist contents:', fs.readdirSync(distPath));
  
  // Проверяем index.html
  const indexPath = path.join(distPath, 'index.html');
  console.log('📄 Index exists:', fs.existsSync(indexPath));
  
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    console.log('📄 Index content:');
    console.log('-'.repeat(30));
    console.log(content);
    console.log('-'.repeat(30));
  }
}

// Раздаем статические файлы
app.use(express.static(distPath));

// Отдельный маршрут для отладки
app.get('/debug', (req, res) => {
  res.json({
    distExists: fs.existsSync(distPath),
    distContents: fs.existsSync(distPath) ? fs.readdirSync(distPath) : [],
    indexPath: path.join(distPath, 'index.html'),
    indexExists: fs.existsSync(path.join(distPath, 'index.html'))
  });
});

// Все остальные запросы
app.use((req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Index file not found');
  }
});

app.listen(port, () => {
  console.log('='.repeat(50));
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`🔍 Debug info at http://localhost:${port}/debug`);
  console.log('='.repeat(50));
});