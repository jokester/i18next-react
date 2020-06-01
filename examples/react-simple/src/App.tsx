import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useI18n, useI18nQualified } from "./i18next-react";

function App() {
  const i18n = useI18n();
  const i18nEn = useI18nQualified('en', 'translation')
  const i18nJa = useI18nQualified('ja', 'translation')
  const i18nZhS = useI18nQualified('zh-Hans', 'translation')
  const i18nZhT = useI18nQualified('zh-Hant', 'translation')

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Demo of <a href="">i18next-react</a>
        </p>
        <div>
          current language: {i18n.language} / {i18n.t('common.hello')}
        </div>
        <div>
          en: {i18nEn && i18nEn('common.hello') || 'not loaded'}
        </div>
        <div>
          ja: {i18nJa && i18nJa('common.hello') || 'not loaded'}</div>
        <div>
          zh-Hans: {i18nZhS && i18nZhS('common.hello') || 'not loaded'}</div>
        <div>
          zh-Hant: {i18nZhT && i18nZhT('common.hello') || 'not loaded'}</div>
        <div>
          {
            ['en', 'ja', 'zh-Hans', 'zh-Hant',].map(lang => <button key={lang} onClick={() => i18n.changeLanguage(lang)}>use {lang}</button>)
          }
        </div>
      </header>


    </div>
  );
}

export default App;
