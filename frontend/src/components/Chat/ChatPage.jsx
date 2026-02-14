import { Container, Row, Col } from 'react-bootstrap';
import { SocketProvider } from '../../contexts/SocketContext';
import Header from '../Header';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import ModalsContainer from './Modals/ModalsContainer';

const ChatPageContent = () => {
  return (
    <Container fluid className="vh-100 d-flex flex-column p-0">
      <Header />
      
      <Row className="flex-grow-1 m-0 bg-light">
        <Col md={3} className="border-end bg-white p-3">
          <Channels />
        </Col>
        <Col md={9} className="d-flex flex-column p-3">
          <div className="flex-grow-1" style={{ overflowY: 'auto' }}>
            <Messages />
          </div>
          <div className="mt-auto">
            <MessageForm />
          </div>
        </Col>
      </Row>
      
      <ModalsContainer />
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
