import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'

const MainPage = () => {
  const navigate = useNavigate()

  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">Добро пожаловать в чат!</h1>
      <p className="lead mb-4">
        Для отправки сообщений необходимо авторизоваться
      </p>
      <Button 
        variant="success" 
        size="lg" 
        onClick={() => navigate('/login')}
      >
        Войти в чат
      </Button>
    </Container>
  )
}

export default MainPage
