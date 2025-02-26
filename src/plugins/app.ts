import { h } from 'vue';
import type { App } from 'vue';
import { ElButton } from 'element-plus';

export function setupAppErrorHandle(app: App) {
  app.config.errorHandler = (err, vm, info) => {
    // eslint-disable-next-line no-console
    console.error(err, vm, info);
  };
}

export function setupAppVersionNotification() {
  // Update check interval in milliseconds
  const UPDATE_CHECK_INTERVAL = 3 * 60 * 1000;

  const canAutoUpdateApp = import.meta.env.VITE_AUTOMATICALLY_DETECT_UPDATE === 'Y' && import.meta.env.PROD;

  if (!canAutoUpdateApp) return;

  let isShow = false;
  let updateInterval: ReturnType<typeof setInterval> | undefined;

  const checkForUpdates = async () => {
    if (isShow) return;

    const buildTime = await getHtmlBuildTime();

    // If build time hasn't changed, no update is needed
    if (buildTime === BUILD_TIME) {
      return;
    }

    isShow = true;

    // Show update notification
    const n = window.$notification!({
      title: '系统版本更新通知',
      message: h('div', {}, [
        h('p', {}, '检测到系统有新版本发布，是否立即刷新页面？'),
        h('div', { style: { display: 'flex', justifyContent: 'end', gap: '12px' } }, [
          h(
            ElButton,
            {
              onClick() {
                n?.close();
              }
            },
            () => '稍后再说'
          ),
          h(
            ElButton,
            {
              type: 'primary',
              onClick() {
                location.reload();
              }
            },
            () => '立即刷新'
          )
        ])
      ])
    });
  };
  const startUpdateInterval = () => {
    if (updateInterval) {
      clearInterval(updateInterval);
    }
    updateInterval = setInterval(checkForUpdates, UPDATE_CHECK_INTERVAL);
  };
  // If updates should be checked, set up the visibility change listener and start the update interval
  if (!isShow && document.visibilityState === 'visible') {
    // Check for updates when the document is visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkForUpdates();
        startUpdateInterval();
      }
    });
    // Start the update interval
    startUpdateInterval();
  }
}

async function getHtmlBuildTime() {
  const baseUrl = import.meta.env.VITE_BASE_URL || '/';

  const res = await fetch(`${baseUrl}index.html?time=${Date.now()}`);

  const html = await res.text();

  const match = html.match(/<meta name="buildTime" content="(.*)">/);

  const buildTime = match?.[1] || '';

  return buildTime;
}
