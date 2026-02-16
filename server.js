const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});