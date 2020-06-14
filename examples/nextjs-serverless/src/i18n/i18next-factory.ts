import i18n, { InitOptions } from 'i18next';

import en from './json/en.json';
import ja from './json/ja.json';
import zhS from './json/zh-hans.json';
import zhT from './json/zh-hant.json';
import { I18NFactory } from 'i18next-react';
import { LangCode } from '../const/languages';

const defaultI18nOptions: InitOptions = {
  defaultNS: 'translation',
  ns: ['translation'],
  resources: {
    [LangCode.en]: { translation: en },
    [LangCode.zhHanT]: { translation: zhT },
    [LangCode.zhHanS]: { translation: zhS },
    [LangCode.ja]: { translation: ja },
  },
};

/**
 * A simplest I18NFactory
 * @param {boolean} forSSR
 * @param {string} lng
 * @returns {i18n}
 */
export const createI18nInstance: I18NFactory = (forSSR: boolean, lng?: string) => {
  const instance = i18n.createInstance({
    ...defaultI18nOptions,
    initImmediate: !forSSR,
    lng,
  });
  instance.init();
  return instance;
};
