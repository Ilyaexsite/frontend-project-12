import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useRemoveChannelMutation } from '../../../store/api/chatApi';
import { closeModal } from '../../../store/slices/modalsSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();
  const { channelId } = useSelector((state) => state.modals);
  const channels = useSelector((state) => state.channels.items);
  const channel = channels.find((ch) => ch.id === channelId);

  const handleRemove = async () => {
    try {
      await removeChannel(channelId).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error('Failed to remove channel:', error);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!channel) return null;

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <p>Вы уверены, что хотите удалить канал <strong># {channel.name}</strong>?</p>
        <p className="text-muted small">
          Все сообщения в этом канале будут удалены.
        </p>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button
          variant="danger"
          onClick={handleRemove}
          disabled={isLoading}
        >
          {isLoading ? 'Удаление...' : 'Удалить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
