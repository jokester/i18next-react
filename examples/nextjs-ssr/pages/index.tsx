import React, { useMemo } from 'react';
import { I18NextReactProvider } from 'i18next-react';
import { LangCode } from '../src/const/languages';
import { createI18nInstance } from '../src/i18n/i18next-factory';
import { LanguageSelectionResponder } from '../src/components/i18n/language-selection-responder';
import { LanguagePicker } from '../src/components/i18n/language-picker';
import { GetServerSideProps } from 'next';
import { pickLanguageForReq } from '../src/ssr/middleware/cookie-lang';

interface PageProps {
  lang: string;
}

const IndexPage: React.FC<PageProps> = (props) => {
  return (
    <I18NextReactProvider factory={createI18nInstance} lang={props.lang}>
      <LanguagePicker />
      <LanguageSelectionResponder />
    </I18NextReactProvider>
  );
};

export default IndexPage;

// required to read/set cookie in our middleware
export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => ({
  props: { lang: pickLanguageForReq(ctx.req, ctx.res, LangCode.en, false) },
});
