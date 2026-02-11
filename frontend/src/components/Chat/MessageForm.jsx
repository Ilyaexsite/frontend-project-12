import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAddMessageMutation } from '../../store/api/chatApi';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import { addMessage, setSendingStatus } from '../../store/slices/messagesSlice';
import { Form, Button, InputGroup, Alert, Spinner } from 'react-bootstrap';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const sendingStatus = useSelector((state) => state.messages.sendingStatus);
  const [addMessageMutation, { isLoading }] = useAddMessageMutation();
  const { sendMessage } = useSocket();
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    
    if (!trimmedMessage || !currentChannelId) return;

    const newMessage = {
      body: trimmedMessage,
      channelId: currentChannelId,
      username: user?.username || 'Anonymous',
      createdAt: new Date().toISOString(),
    };

    // Оптимистичное обновление
    dispatch(addMessage({ ...newMessage, id: Date.now() }));
    setMessage('');
    setError('');
    dispatch(setSendingStatus('loading'));

    try {
      // Пытаемся отправить через REST API
      await addMessageMutation(newMessage).unwrap();
      
      // Отправляем через WebSocket для реального времени
      if (sendMessage) {
        sendMessage(newMessage);
      }
      
      dispatch(setSendingStatus('succeeded'));
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Не удалось отправить сообщение. Попробуйте снова.');
      dispatch(setSendingStatus('failed'));
      
      // Удаляем оптимистичное сообщение при ошибке
      // Здесь можно добавить логику удаления временного сообщения
    } finally {
      setTimeout(() => dispatch(setSendingStatus('idle')), 1000);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      {error && (
        <Alert variant="danger" className="py-2" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      <InputGroup>
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={currentChannelId ? "Введите сообщение..." : "Выберите канал"}
          disabled={isLoading || !currentChannelId}
          aria-label="Новое сообщение"
          className="border-end-0"
        />
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isLoading || !message.trim() || !currentChannelId}
          className="position-relative"
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Отправка...
            </>
          ) : (
            'Отправить'
          )}
        </Button>
      </InputGroup>
      
      {!currentChannelId && (
        <Form.Text className="text-muted">
          Выберите канал для отправки сообщений
        </Form.Text>
      )}
    </Form>
  );
};

export default MessageForm;
