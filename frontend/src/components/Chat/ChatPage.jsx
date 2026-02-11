import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { SocketProvider } from '../../context/SocketContext';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

const ChatPageContent = () => {
  const { logout } = useAuth();

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0">
      <Row className="bg-primary text-white py-3 m-0">
        <Col className="d-flex justify-content-between align-items-center px-4">
          <h4 className="mb-0">💬 Hexlet Chat</h4>
          <Button variant="outline-light" size="sm" onClick={logout}>
            Выйти
          </Button>
        </Col>
      </Row>
      
      <Row className="flex-grow-1 m-0 bg-light">
        <Col md={3} className="border-end bg-white p-3">
          <Channels />
        </Col>
        <Col md={9} className="d-flex flex-column p-3">
          <div className="flex-grow-1">
            <Messages />
          </div>
          <div className="mt-auto">
            <MessageForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const ChatPage = () => {
  return (
    <SocketProvider>
      <ChatPageContent />
    </SocketProvider>
  );
};

export default ChatPage;
