import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAddMessageMutation } from '../../store/api/chatApi'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const MessageForm = () => {
  const [message, setMessage] = useState('')
  const currentChannelId = useSelector((state) => state.channels.currentChannelId)
  const [addMessage, { isLoading }] = useAddMessageMutation()
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || !currentChannelId) return

    try {
      await addMessage({
        body: message,
        channelId: currentChannelId,
        username: user?.username || 'Anonymous',
      }).unwrap()
      setMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  if (!currentChannelId) {
    return null
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <InputGroup>
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите сообщение..."
          disabled={isLoading}
          aria-label="Новое сообщение"
        />
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? 'Отправка...' : 'Отправить'}
        </Button>
      </InputGroup>
    </Form>
  )
}

export default MessageForm
