import { defineBackground } from 'wxt/sandbox';
import { useSetting, Mode, defaultSetting } from '@/utils/useSetting';

export default defineBackground(() => {
  const { setting } = useSetting();

  browser.runtime.onMessage.addListener(async message => {
    if (message.action === 'openPopup') {
      await openPopup(message);
    } else if (message.action === 'shouldOpenInPopup') {
      return await shouldOpenInPopup(message);
    } else if (message.action === 'closePopup') {
      await closePopup(message);
    }
  });

  async function shouldOpenInPopup(message: any) {
    // 获取最新设置
    const storedSetting = await storage.getItem(StorageId);
    setting.value = storedSetting
      ? JSON.parse(storedSetting as string)
      : defaultSetting;

    if (!setting.value) return { shouldOpenInPopup: false };

    const url = new URL(message.url);
    const urlHost = url.host;
    
    // 先检查是否需要小窗打开
    const shouldOpenInPopup = setting.value.urlOpenCount[urlHost] >= setting.value.autoSmartThreshold;

    return { shouldOpenInPopup };
  }

  async function openPopup(message: any) {
    // 获取最新的设置
    const storedSetting = await storage.getItem(StorageId);
    setting.value = storedSetting
      ? JSON.parse(storedSetting as string)
      : defaultSetting;

    if (!setting.value) return;

    const url = new URL(message.url);
    const urlHost = url.host;

    // 更新打开次数 - 移到这里，只在实际使用小窗时计数
    if (!setting.value.urlOpenCount[urlHost]) {
      setting.value.urlOpenCount[urlHost] = 0;
    }
    setting.value.urlOpenCount[urlHost]++;

    // 保存更新后的设置
    await storage.setItem(StorageId, JSON.stringify(setting.value));

    // 设置小窗参数并打开
    url.searchParams.set('isSmartPopup', 'true');
    let windowOptions;

    if (setting.value.mode === Mode.Center) {
      windowOptions = await getCenterModeOptions();
    } else {
      windowOptions = await getSmartModeOptions(message.url);
    }

    browser.windows.create({
      ...windowOptions,
      url: url.toString(),
      type: message.type || 'popup',
    });
  }

  async function getCenterModeOptions() {
    const currentWindow = await browser.windows.getCurrent();
    const { top = 0, left = 0, width = 0, height = 0 } = currentWindow;

    const widthPercentage = setting.value ? setting.value.width : 90;
    const heightPercentage = setting.value ? setting.value.height : 92;
    const newWidth = Math.round((width * widthPercentage) / 100);
    const newHeight = Math.round((height * heightPercentage) / 100);
    const newLeft = Math.round(left + (width - newWidth) / 2);
    const newTop = Math.round(top + (height - newHeight) / 2);

    return { width: newWidth, height: newHeight, left: newLeft, top: newTop };
  }

  async function getSmartModeOptions(url: string) {
    if (!setting.value) return;
    const newUrl = new URL(url);
    const config = setting.value.smartModeConfig[newUrl.host] || false;
    if (config) {
      return {
        width: config.width,
        height: config.height,
        left: config.left,
        top: config.top,
      };
    }
    return await getCenterModeOptions();
  }

  async function closePopup(message: any) {
    if (!setting.value) return;
    const { top, left, width, height } = message.postion;
    const url = new URL(message.url);
    setting.value.smartModeConfig[url.host] = {
      url: message.url,
      left,
      top,
      width,
      height,
    };
  }
});
