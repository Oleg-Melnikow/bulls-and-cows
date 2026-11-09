import { renderApp } from './components/renderApp.js';

const appRoot = document.querySelector('body');
if (appRoot) {
  renderApp(appRoot);
}
