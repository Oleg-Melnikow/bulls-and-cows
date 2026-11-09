import { createSettingsScreen } from './components/createSettingsScreen.js';

const appRoot = document.querySelector('body');
if (appRoot) {
  appRoot.append(createSettingsScreen());
}
