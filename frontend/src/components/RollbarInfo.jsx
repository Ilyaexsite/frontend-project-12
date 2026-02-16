import { useRollbar } from '@rollbar/react';
import { Alert } from 'react-bootstrap';

const RollbarInfo = () => {
  const rollbar = useRollbar();

  // Проверяем, активен ли Rollbar в этом окружении
  const isActive = process.env.NODE_ENV === 'production';

  return (
    <Alert variant={isActive ? 'success' : 'secondary'} className="mt-3">
      <Alert.Heading>Rollbar Error Tracking</Alert.Heading>
      <p>
        Status: <strong>{isActive ? '✅ Active' : '⚠️ Disabled'}</strong>
      </p>
      <p className="mb-0 small">
        {isActive 
          ? 'Все ошибки будут отправляться в Rollbar для мониторинга' 
          : 'Rollbar отключен в режиме разработки. Для тестирования используйте кнопки выше.'}
      </p>
    </Alert>
  );
};

export default RollbarInfo;
