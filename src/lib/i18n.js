import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const en = require('../locales/en');
const pl = require('../locales/pl');

i18n.use(initReactI18next).init({
  debug: true,
  ns: ['navbar', 'headings'],
  defaultNS: 'common',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    pl,
    en,
  },
});

export default i18n;
