const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5001;

console.log('='.repeat(50));
console.log('🚀 SERVER STARTING...');
console.log('='.repeat(50));

// Текущая директория
console.log('📂 Current directory:', __dirname);
console.log('📂 Current files:', fs.readdirSync(__dirname));

// Путь к статическим файлам
const staticDirPath = path.join(__dirname, 'frontend/dist');
console.log('📁 Static path:', staticDirPath);
console.log('📁 Static exists:', fs.existsSync(staticDirPath));

if (fs.existsSync(staticDirPath)) {
  console.log('📁 Dist contents:', fs.readdirSync(staticDirPath));
  
  const indexPath = path.join(staticDirPath, 'index.html');
  console.log('📄 Index exists:', fs.existsSync(indexPath));
  
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    console.log('📄 Index size:', indexContent.length, 'bytes');
    console.log('📄 Contains root:', indexContent.includes('id="root"'));
    console.log('📄 Contains Hexlet Chat:', indexContent.includes('Hexlet Chat'));
    console.log('📄 First 200 chars:', indexContent.substring(0, 200));
  }
} else {
  console.log('❌ Dist folder not found!');
  
  // Проверяем frontend папку
  const frontendPath = path.join(__dirname, 'frontend');
  console.log('📁 Frontend exists:', fs.existsSync(frontendPath));
  
  if (fs.existsSync(frontendPath)) {
    console.log('📁 Frontend contents:', fs.readdirSync(frontendPath));
  }
}

// Раздаем статические файлы
app.use(express.static(staticDirPath));

// Middleware для логирования всех запросов
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.url}`);
  next();
});

// Обработка всех запросов
app.use((req, res) => {
  console.log(`📥 Handling request: ${req.url}`);
  
  const indexPath = path.join(staticDirPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    console.log('✅ Sending index.html');
    res.sendFile(indexPath);
  } else {
    console.error('❌ index.html not found!');
    res.status(500).send(`
      <html>
        <body>
          <h1>Error</h1>
          <p>index.html not found at: ${indexPath}</p>
          <pre>${JSON.stringify({
            cwd: __dirname,
            staticExists: fs.existsSync(staticDirPath),
            staticFiles: fs.existsSync(staticDirPath) ? fs.readdirSync(staticDirPath) : []
          }, null, 2)}</pre>
        </body>
      </html>
    `);
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log('='.repeat(50));
  console.log(`✅ SERVER RUNNING on http://localhost:${port}`);
  console.log('='.repeat(50));
});