import { useRollbar } from '@rollbar/react';
import { Button, Alert } from 'react-bootstrap';

const TestRollbar = () => {
  const rollbar = useRollbar();

  const testError = () => {
    try {
      // Генерируем тестовую ошибку
      throw new Error('🧪 Тестовая ошибка для Rollbar');
    } catch (error) {
      // Отправляем в Rollbar
      rollbar.error('Тестовая ошибка из React', error);
      alert('Ошибка отправлена в Rollbar! Проверьте дашборд.');
    }
  };

  const testUnhandledError = () => {
    // Необработанная ошибка (будет поймана глобально)
    setTimeout(() => {
      throw new Error('🔥 Необработанная ошибка для Rollbar');
    }, 100);
  };

  const testRejection = () => {
    // Необработанный reject промиса
    Promise.reject(new Error('💥 Необработанный reject для Rollbar'));
  };

  return (
    <Alert variant="info" className="mt-3">
      <Alert.Heading>🧪 Тестирование Rollbar</Alert.Heading>
      <p className="mb-2">
        Токен: <code>{rollbar?.client?.accessToken || 'загружается...'}</code>
      </p>
      <div className="d-flex gap-2 flex-wrap">
        <Button variant="warning" size="sm" onClick={testError}>
          Отправить тестовую ошибку
        </Button>
        <Button variant="danger" size="sm" onClick={testUnhandledError}>
          Необработанная ошибка
        </Button>
        <Button variant="info" size="sm" onClick={testRejection}>
          Необработанный reject
        </Button>
      </div>
      <p className="mt-2 mb-0 small text-muted">
        Статус: <strong>{process.env.NODE_ENV === 'production' ? '✅ Активен' : '⚠️ Только в продакшене'}</strong>
      </p>
    </Alert>
  );
};

export default TestRollbar;
