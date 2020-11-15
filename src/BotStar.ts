import { BotStarApiFunc, createBotStarApi } from './BotStarApi';
import { BotStarSettings } from './BotStarSettings';

type BotStarWindow = typeof window & {
  BotStarApi?: any;
  BotStar?: any;
  BotStarUp?: boolean;
};

export type BotStarInitialisedCallback = (api: BotStarApiFunc) => void;

const bWindow = window as BotStarWindow;

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
    botStarWidget.onload = () => onBotStarInitialised(bWindow.BotStarApi);
  }

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript?.parentNode?.insertBefore(botStarWidget, firstScript);
};

export const teardownBotStar = (scriptId: string) => {
  // Remove Widget Script
  const widget = document.getElementById(scriptId);
  widget?.parentElement?.removeChild(widget);

  // Clear out API scope
  delete bWindow.BotStarApi;

  // Clear out BotStar settings
  delete bWindow.BotStar;
  delete bWindow.BotStarUp;
};

export const setBotStarGlobalSettings = (
  settings: Partial<BotStarSettings>
) => {
  bWindow.BotStar = { ...settings };
};

export const setupBotStarApi = () => {
  bWindow.BotStarApi = createBotStarApi();
};
