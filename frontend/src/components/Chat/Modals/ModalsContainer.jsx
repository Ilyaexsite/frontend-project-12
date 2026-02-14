import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

const ModalsContainer = () => {
  const { isOpen, type } = useSelector((state) => state.modals);

  if (!isOpen) return null;

  switch (type) {
    case 'adding':
      return <AddChannelModal />;
    case 'renaming':
      return <RenameChannelModal />;
    case 'removing':
      return <RemoveChannelModal />;
    default:
      return null;
  }
};

export default ModalsContainer;
