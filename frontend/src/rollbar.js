import Rollbar from 'rollbar';

// Конфигурация для клиентской части
const baseConfig = {
  captureUncaught: true,        // Ловить необработанные ошибки
  captureUnhandledRejections: true, // Ловить необработанные промисы
  environment: process.env.NODE_ENV || 'production',
  enabled: process.env.NODE_ENV === 'production', // Только в продакшене
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0', // Версия вашего приложения
        source_map_enabled: true
      }
    }
  }
};

// Получите этот токен из настроек проекта в Rollbar
// Для безопасности используйте переменные окружения
const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN || 'your-client-token-here',
  ...baseConfig,
};

export const rollbar = new Rollbar(rollbarConfig);
export default rollbarConfig;
