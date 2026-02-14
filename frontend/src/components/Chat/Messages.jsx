import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../store/api/chatApi';
import { useEffect, useRef } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { data: messages = [], isLoading, error } = useGetMessagesQuery();
  const messagesEndRef = useRef(null);

  const currentMessages = messages.filter(
    (msg) => msg.channelId === currentChannelId
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">{t('chat.loadingMessages')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {t('chat.errorLoadingMessages')}
      </Alert>
    );
  }

  if (!currentChannelId) {
    return (
      <div className="text-center text-muted py-5">
        {t('chat.selectChannel')}
      </div>
    );
  }

  if (currentMessages.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        {t('chat.noMessages')}
        <p className="mt-2 small">{t('chat.beFirst')}</p>
      </div>
    );
  }

  return (
    <div className="messages overflow-auto" style={{ height: '60vh' }}>
      {currentMessages.map((msg) => (
        <div key={msg.id} className="message mb-3 p-2 bg-white rounded">
          <div className="d-flex align-items-center mb-1">
            <strong className="text-primary me-2">{msg.username}</strong>
            <span className="text-muted small">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
          <div className="ms-2" style={{ wordBreak: 'break-word' }}>
            {msg.body}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
