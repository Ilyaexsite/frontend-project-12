const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 5001;

const staticDirPath = path.join(__dirname, 'frontend/dist');
app.use(express.static(staticDirPath));

// ✅ Используем middleware вместо маршрута
app.use((req, res) => {
  res.sendFile(path.join(staticDirPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Test server running on port ${port}`);
});