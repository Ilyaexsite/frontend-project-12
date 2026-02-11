import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../../store/api/chatApi';
import { setCurrentChannel } from '../../store/slices/channelsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { data: channels = [] } = useGetChannelsQuery();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <div className="channels-list">
      <h5>Каналы</h5>
      <div className="list-group">
        {channels.map((channel) => (
          <button
            key={channel.id}
            className={`list-group-item list-group-item-action ${currentChannelId === channel.id ? 'active' : ''}`}
            onClick={() => dispatch(setCurrentChannel(channel.id))}
          >
            # {channel.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Channels
