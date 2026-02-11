import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../store/api/chatApi';
import { useEffect, useRef, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messagesFromStore = useSelector((state) => state.messages.items);
  const { isLoading, error, refetch } = useGetMessagesQuery();
  const messagesEndRef = useRef(null);
  const [networkStatus, setNetworkStatus] = useState('online');

  // Отслеживаем статус сети
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Фильтруем сообщения для текущего канала
  const currentMessages = messagesFromStore.filter(
    msg => msg.channelId === currentChannelId
  );

  // Автоскролл
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  // Перезагружаем сообщения при восстановлении сети
  useEffect(() => {
    if (networkStatus === 'online') {
      refetch();
    }
  }, [networkStatus, refetch]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Загрузка сообщений...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Ошибка загрузки</Alert.Heading>
        <p>Не удалось загрузить сообщения. </p>
        <button onClick={refetch} className="btn btn-outline-danger btn-sm">
          Попробовать снова
        </button>
      </Alert>
    );
  }

  return (
    <div className="messages-container bg-light p-3 rounded" style={{ height: '60vh', overflowY: 'auto' }}>
      {networkStatus === 'offline' && (
        <Alert variant="warning" className="text-center">
          ⚡ Вы офлайн. Сообщения могут не отправляться.
        </Alert>
      )}
      
      {currentMessages.length === 0 ? (
        <div className="text-center text-muted py-5">
          💬 Нет сообщений в этом канале
          <p className="mt-2 small">Будьте первым, кто напишет!</p>
        </div>
      ) : (
        <>
          {currentMessages.map((message, index) => (
            <div 
              key={message.id || `temp-${index}`} 
              className={`message mb-3 p-2 rounded ${!message.id ? 'bg-light' : ''}`}
            >
              <div className="d-flex align-items-center mb-1">
                <strong className="text-primary me-2">{message.username}</strong>
                <span className="text-muted small">
                  {new Date(message.createdAt).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                {!message.id && (
                  <span className="badge bg-warning text-dark ms-2">Отправка...</span>
                )}
              </div>
              <div className="ms-2">
                {message.body}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  )
}

export default Messages
