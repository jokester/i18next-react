import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { I18NextReactProvider } from 'i18next-react';
import { i18NextFactory } from "./i18next-factory";

ReactDOM.render(
  <React.StrictMode>
    <I18NextReactProvider lang="zh-Hans" factory={i18NextFactory}>
      <App/>
    </I18NextReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
