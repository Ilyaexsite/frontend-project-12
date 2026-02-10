import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button, Container, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios'

const ChatPage = () => {
  const { user, logout } = useAuth()
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchChannels()
  }, [])

  const fetchChannels = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/v1/channels')
      setChannels(response.data)
      setError('')
    } catch (err) {
      console.error('Error fetching channels:', err)
      setError('Не удалось загрузить каналы чата')
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Чат</h1>
        <Button variant="outline-danger" onClick={handleLogout}>
          Выйти
        </Button>
      </div>

      <Alert variant="success" className="mb-4">
        Вы успешно авторизованы! Токен сохранен в localStorage.
      </Alert>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Доступные каналы</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="warning">{error}</Alert>
          ) : channels.length === 0 ? (
            <p className="text-muted">Нет доступных каналов</p>
          ) : (
            <ul className="list-group">
              {channels.map((channel) => (
                <li key={channel.id} className="list-group-item">
                  <strong>{channel.name}</strong>
                  <span className="badge bg-secondary ms-2">
                    {channel.messages_count} сообщений
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Информация о пользователе</h5>
          <p className="card-text">
            <strong>Токен:</strong> 
            <code className="d-block mt-2 p-2 bg-light rounded">
              {user?.token?.substring(0, 50)}...
            </code>
          </p>
          <Button variant="primary" onClick={fetchChannels} disabled={loading}>
            {loading ? 'Обновление...' : 'Обновить каналы'}
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default ChatPage
