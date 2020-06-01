import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
