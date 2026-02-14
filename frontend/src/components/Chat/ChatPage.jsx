import { Container, Row, Col, Alert } from 'react-bootstrap';
import { SocketProvider } from '../../contexts/SocketContext';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import Header from '../Header';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import ModalsContainer from './Modals/ModalsContainer';
import { useTranslation } from 'react-i18next';

const ChatPageContent = () => {
  const { isOnline } = useNetworkStatus();
  const { t } = useTranslation();

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0">
      <Header />
      
      {!isOnline && (
        <Alert variant="warning" className="text-center m-0 rounded-0">
          {t('toast.error.connectionLost')}
        </Alert>
      )}
      
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
