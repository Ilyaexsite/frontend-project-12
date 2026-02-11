import { useSelector } from 'react-redux'
import { useGetMessagesQuery } from '../../store/api/chatApi'
import { Spinner, Alert } from 'react-bootstrap'
import { useEffect, useRef } from 'react'

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId)
  const { data: messages = [], isLoading, error } = useGetMessagesQuery()
  const messagesEndRef = useRef(null)

  const currentMessages = messages.filter(
    (msg) => msg.channelId === currentChannelId
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages])

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="danger">
      </Alert>
    )
  }

  if (!currentChannelId) {
    return (
      <div className="text-center text-muted py-4">
        Выберите канал
      </div>
    )
  }

  return (
    <div className="messages bg-light p-3 rounded" style={{ height: '60vh', overflowY: 'auto' }}>
      {currentMessages.length === 0 ? (
        <div className="text-center text-muted py-4">
          Нет сообщений в этом канале
        </div>
      ) : (
        <>
          {currentMessages.map((message) => (
            <div key={message.id} className="message mb-3">
              <strong className="text-primary">{message.username}:</strong>
              <span className="ms-2">{message.body}</span>
              <div className="text-muted small">
                {new Date(message.createdAt).toLocaleString()}
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
