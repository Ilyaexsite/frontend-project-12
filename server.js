const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 10000

app.use(express.static(path.join(__dirname, 'frontend/dist')))

app.get('/api/v1/channels', (req, res) => {
  res.json([
    { id: 1, name: 'general', messages_count: 42 },
    { id: 2, name: 'random', messages_count: 15 },
    { id: 3, name: 'help', messages_count: 8 }
  ])
})

app.post('/api/v1/login', express.json(), (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({
      token: 'fake-jwt-token-for-testing',
      username: 'admin'
    })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Frontend served from: ${path.join(__dirname, 'frontend/dist')}`)
})
