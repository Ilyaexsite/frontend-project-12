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

const rollbarConfig = {
  accessToken: 'bee6d9f788ec424f99a7b262ac6ee990', // Ваш токен из Rollbar
  ...baseConfig,
};

export const rollbar = new Rollbar(rollbarConfig);
export default rollbarConfig;