import { BotStarApiFunc, createBotStarApi } from './BotStarApi';
import { BotStarSettings } from './BotStarSettings';

export interface BotStarWindow extends Window {
  BotStar?: any;
  BotStarApi?: BotStarApiFunc;
  BotStarUp?: boolean;
}

declare let window: BotStarWindow;

export type BotStarInitialisedCallback = (api: BotStarApiFunc) => void;

export const createBotStarWidgetScript = (
  scriptId: string,
  onBotStarInitialised?: BotStarInitialisedCallback
) => {
  const botStarWidget = document.createElement('script');
  botStarWidget.id = scriptId;
  botStarWidget.type = 'text/javascript';
  botStarWidget.async = true;
  botStarWidget.src = 'https://widget.botstar.com/static/js/widget.js';
  if (onBotStarInitialised) {
    botStarWidget.onload = () =>
      onBotStarInitialised(window.BotStarApi ?? (() => {}));
  }

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript?.parentNode?.insertBefore(botStarWidget, firstScript);
};

export const teardownBotStar = (scriptId: string) => {
  // Remove Widget Script
  const widget = document.getElementById(scriptId);
  widget?.parentElement?.removeChild(widget);

  // Clear out API scope
  delete window.BotStarApi;

  // Clear out BotStar settings
  delete window.BotStar;
  delete window.BotStarUp;
};

export const setBotStarGlobalSettings = (
  settings: Partial<BotStarSettings>
) => {
  window.BotStar = { ...settings };
};

export const setupBotStarApi = () => {
  window.BotStarApi = createBotStarApi();
};
