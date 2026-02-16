import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddMessageMutation } from '../../store/api/chatApi';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { cleanProfanity, hasProfanity } from '../../utils/profanityFilter';
import { showWarningToast } from '../../utils/toast';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    
    if (!trimmedMessage || !currentChannelId) return;

    // Проверка на нецензурные слова
    if (hasProfanity(trimmedMessage)) {
      showWarningToast(t('profanity.messageWarning'));
      // Очищаем сообщение от нецензурных слов
      const cleanedMessage = cleanProfanity(trimmedMessage);
      setMessage(cleanedMessage);
      return;
    }

    try {
      await addMessage({
        body: trimmedMessage,
        channelId: currentChannelId,
        username: user?.username || 'Anonymous',
      }).unwrap();
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  const handleBlur = () => {
    // При потере фокуса проверяем и очищаем
    if (hasProfanity(message)) {
      const cleaned = cleanProfanity(message);
      setMessage(cleaned);
      showWarningToast(t('profanity.messageCleaned'));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <InputGroup>
        <Form.Control
          type="text"
          value={message}
          onChange={handleChange}
          onBlur={handleBlur}
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
