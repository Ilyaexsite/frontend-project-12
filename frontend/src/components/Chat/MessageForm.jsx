import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddMessageMutation } from '../../store/api/chatApi';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
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
          placeholder={currentChannelId ? t('chat.messagePlaceholder') : t('chat.selectChannel')}
          disabled={isLoading || !currentChannelId}
          maxLength={500}
        />
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isLoading || !message.trim() || !currentChannelId}
        >
          {isLoading ? t('common.sending') : t('common.send')}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
