import React from 'react';
import { useI18n } from 'i18next-react';
import { LangMap } from '../../const/languages';

export const LanguagePicker: React.FC = () => {
  const i18n = useI18n();

  return (
    <div>
      current lang: {i18n.language}
      <hr />
      {Array.from(LangMap).map(([langCode, lang]) => (
        <button
          disabled={langCode === i18n.language}
          onClick={() => i18n.changeLanguage(langCode)}
          key={langCode}
          lang={langCode}
        >
          changeLanguage({lang.label})
        </button>
      ))}
    </div>
  );
};
