import { Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import Channels from './Channels'
import Messages from './Messages'
import MessageForm from './MessageForm'
import { Button } from 'react-bootstrap'

const ChatPage = () => {
  const { logout } = useAuth()

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Row className="bg-primary text-white py-2 mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Hexlet Chat</h4>
          <Button variant="outline-light" size="sm" onClick={logout}>
            Выйти
          </Button>
        </Col>
      </Row>
      
      <Row className="flex-grow-1">
        <Col md={3} className="border-end">
          <Channels />
        </Col>
        <Col md={9} className="d-flex flex-column">
          <div className="flex-grow-1">
            <Messages />
          </div>
          <div className="mt-auto">
            <MessageForm />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ChatPage
