import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { openModal } from '../../store/slices/modalsSlice';

const ChannelMenu = ({ channel }) => {
  const dispatch = useDispatch();

  const handleRename = () => {
    dispatch(openModal({ type: 'renaming', channelId: channel.id }));
  };

  const handleRemove = () => {
    dispatch(openModal({ type: 'removing', channelId: channel.id }));
  };

  // Для дефолтных каналов (general, random, help) нельзя удалять/переименовывать
  const isDefault = !channel.removable;

  if (isDefault) return null;

  return (
    <Dropdown className="ms-2">
      <Dropdown.Toggle
        variant="link"
        size="sm"
        className="text-decoration-none p-0 text-muted"
        id={`channel-menu-${channel.id}`}
      >
        ⋮
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRename}>Переименовать</Dropdown.Item>
        <Dropdown.Item onClick={handleRemove} className="text-danger">
          Удалить
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelMenu;
