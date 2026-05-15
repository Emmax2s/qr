import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es.json';
import en from './en.json';

export const resources = {
  es: { translation: es },
  en: { translation: en },
} as const;

export type Language = keyof typeof resources;

i18next.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'es',
  fallbackLng: 'es',
  ns: ['translation'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
