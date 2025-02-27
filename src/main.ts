import { createApp } from 'vue';
import './plugins/assets';
import {
  setupAppVersionNotification,
  setupDayjs,
  setupIconifyOffline,
  setupLoading,
  setupNProgress,
  setupUI,
  setupVxeTable
} from './plugins';
import { setupStore } from './store';
import { setupRouter } from './router';
import App from './App.vue';

async function setupApp() {
  setupLoading();

  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  const app = createApp(App);

  setupUI(app);

  setupVxeTable(app);

  setupStore(app);

  await setupRouter(app);

  setupAppVersionNotification();

  app.mount('#app');
}

setupApp();
