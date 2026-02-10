import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Добро пожаловать в чат!</h1>
      <p>Для отправки сообщений необходимо авторизоваться</p>
      <button
        onClick={() => navigate('/login')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Войти в чат
      </button>
    </div>
  )
}

export default MainPage
