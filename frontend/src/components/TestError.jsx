import { useRollbar } from '@rollbar/react';
import { Button } from 'react-bootstrap';

const TestError = () => {
  const rollbar = useRollbar();

  const triggerError = () => {
    try {
      // Искусственная ошибка
      throw new Error('Тестовая ошибка для Rollbar');
    } catch (error) {
      // Логируем в Rollbar
      rollbar.error('Тестовая ошибка', error);
      console.error('Ошибка отправлена в Rollbar');
    }
  };

  const triggerUnhandledError = () => {
    // Необработанная ошибка (будет поймана глобально)
    setTimeout(() => {
      throw new Error('Необработанная ошибка для Rollbar');
    }, 100);
  };

  const triggerRejection = () => {
    // Необработанный reject промиса
    Promise.reject(new Error('Необработанный reject для Rollbar'));
  };

  return (
    <div className="p-3 bg-light rounded">
      <h5>Тестирование Rollbar</h5>
      <div className="d-flex gap-2">
        <Button variant="warning" size="sm" onClick={triggerError}>
          Тест: handled error
        </Button>
        <Button variant="danger" size="sm" onClick={triggerUnhandledError}>
          Тест: unhandled error
        </Button>
        <Button variant="info" size="sm" onClick={triggerRejection}>
          Тест: unhandled rejection
        </Button>
      </div>
    </div>
  );
};

export default TestError;
