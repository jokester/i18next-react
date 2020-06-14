import React, { useEffect } from 'react';
import { useI18n } from 'i18next-react';
import Head from 'next/head';
import { setLangCookie } from '../../i18n/i18n-pref';
import { LangCode } from '../../const/languages';

export const LanguageSelectionResponder: React.FC = () => {
  const i18n = useI18n();

  useEffect(() => {
    const onLanguageChanged = (lang: string) => {
      setLangCookie(lang as LangCode);
      document.documentElement.lang = lang;
    };
    i18n.on('languageChanged', onLanguageChanged);
    return () => i18n.off('languageChanged', onLanguageChanged);
  }, [i18n]);

  return (
    <Head>
      <title>{i18n.t('site.siteName')}</title>
    </Head>
  );
};
