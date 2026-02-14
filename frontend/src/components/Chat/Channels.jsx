import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../../store/api/chatApi';
import { setCurrentChannel } from '../../store/slices/channelsSlice';
import { openModal } from '../../store/slices/modalsSlice';
import ChannelMenu from './ChannelMenu';
import { Spinner, Alert, ListGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels = [], isLoading, error } = useGetChannelsQuery();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">{t('chat.loadingChannels')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        {t('chat.errorLoadingChannels')}
      </Alert>
    );
  }

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'adding' }));
  };

  return (
    <div className="channels">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">{t('chat.channels')}</h5>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleAddChannel}
          title={t('channels.addChannel')}
        >
          +
        </Button>
      </div>
      
      <ListGroup className="overflow-auto" style={{ maxHeight: '70vh' }}>
        {channels.map((channel) => (
          <ListGroup.Item
            key={channel.id}
            action
            active={currentChannelId === channel.id}
            onClick={() => dispatch(setCurrentChannel(channel.id))}
            className="d-flex justify-content-between align-items-center"
          >
            <span className="text-truncate">
              # {channel.name}
            </span>
            <ChannelMenu channel={channel} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Channels;
