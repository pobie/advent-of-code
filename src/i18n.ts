import { initReactI18next } from 'react-i18next';
import main from './locales/en/main.json';
import i18n from 'i18next';

export const defaultNS = 'main';
export const resources = {
  en: {
    main,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['main'],
  fallbackLng: {
    default: ['en'],
  },
  debug: true,
  defaultNS,
  resources,
});
