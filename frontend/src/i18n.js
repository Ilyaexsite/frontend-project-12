import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationRU from './locales/ru/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',           // Фиксированный русский язык
    fallbackLng: 'ru',    // Резервный тоже русский
    supportedLngs: ['ru', 'en'], // Поддерживаемые языки
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    
    // ОТКЛЮЧАЕМ ВСЕ АВТООПРЕДЕЛЕНИЯ
    detection: null,
    
    interpolation: {
      escapeValue: false,
    },
    
    // Отключаем определение языка из браузера
    react: {
      useSuspense: true,
    },
    
    // Явно указываем, что не используем детектор
    initImmediate: false,
  });

// Принудительно устанавливаем русский язык
i18n.changeLanguage('ru');

export default i18n;
