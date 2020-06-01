import i18next, { i18n } from 'i18next';
import HttpBackend from 'i18next-http-backend';
import localeEn from './locales/en.json'

import { I18NFactory } from "i18next-react";

let configuredInstance: i18n = null!;

export const i18NextFactory: I18NFactory = (inServer, initialLang) => {

  if (!configuredInstance) {
    const instance = configuredInstance = i18next.createInstance({});

    instance.on('initialized', loaded => console.log('i18next.initialized', loaded))
    instance.on('loaded', loaded => console.log('i18next.loaded', loaded))
    instance.on('added', (lang, ns) => console.log('i18next.added', lang, ns))
    instance.on('removed', (lang, ns) => console.log('i18next.removed', lang, ns))

    instance
      .use(HttpBackend)
      .init({
        // bundle en to provide a always-available fallback
        resources: {
          en: {
            translation: localeEn,
          }
        },
        partialBundledLanguages: true,
        fallbackLng: 'en',
        lng: initialLang,
        backend: {
          loadPath: '/locales/{{lng}}.json',
        },
      }, undefined)
  }

  return configuredInstance;
};
