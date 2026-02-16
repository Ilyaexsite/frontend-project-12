import { useRollbar } from '@rollbar/react';
import { Button, Alert } from 'react-bootstrap';

const TestRollbar = () => {
  const rollbar = useRollbar();

  const sendTestError = () => {
    try {
      // Генерируем тестовую ошибку
      throw new Error('🧪 Тестовая ошибка для Rollbar');
    } catch (error) {
      // Отправляем в Rollbar
      rollbar.error('Тестовая ошибка из React', error);
      alert('✅ Ошибка отправлена в Rollbar! Страница обновится через 5 секунд...');
      
      // Перенаправляем на дашборд Rollbar через 5 секунд
      setTimeout(() => {
        window.open('https://rollbar.com', '_blank');
      }, 5000);
    }
  };

  return (
    <Alert variant="info" className="mt-3">
      <Alert.Heading>🧪 Тестирование Rollbar</Alert.Heading>
      <p className="mb-2">
        Токен: <code>{rollbar?.client?.accessToken || '17ea3bff7a67...'}</code>
      </p>
      <Button variant="warning" onClick={sendTestError}>
        🔥 Отправить тестовую ошибку в Rollbar
      </Button>
      <p className="mt-2 mb-0 small text-muted">
        Нажмите кнопку, чтобы активировать интеграцию
      </p>
    </Alert>
  );
};

export default TestRollbar;
