import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddMessageMutation } from '../../store/api/chatApi';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Button, InputGroup } from 'react-bootstrap';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !currentChannelId) return;

    try {
      await addMessage({
        body: message.trim(),
        channelId: currentChannelId,
        username: user?.username || 'Anonymous',
      }).unwrap();
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <InputGroup>
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={currentChannelId ? "Введите сообщение..." : "Выберите канал"}
          disabled={isLoading || !currentChannelId}
          maxLength={500}
        />
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isLoading || !message.trim() || !currentChannelId}
        >
          {isLoading ? 'Отправка...' : 'Отправить'}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
