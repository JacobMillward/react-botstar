import { BotStarSettings } from './BotStarSettings';
import {
  BotStarInitialisedCallback,
  createBotStarWidgetScript,
  setBotStarGlobalSettings,
  setupBotStarApi,
  teardownBotStar
} from './BotStar';
import { useEffect, useRef } from 'react';

// Random UUID to prevent clashes
const botStarWidgetId = 'botstar-widget-2875b3ff-d61e-4840-b587-91445f16c387';

export interface BotStarWidgetProps {
  appId: string;
  settings?: Partial<Omit<BotStarSettings, 'appId'>>;
  isLoading?: boolean;
  onBotStarInitialised?: BotStarInitialisedCallback;
  children: React.ReactNode;
  [k: string]: any;
}

export const BotStarWidget: React.FC<BotStarWidgetProps> = ({
  appId,
  settings = { mode: 'inline' },
  isLoading = false,
  onBotStarInitialised,
  children,
  ...props
}) => {
  const onBotStarInitialisedRef = useRef<BotStarInitialisedCallback>();
  onBotStarInitialisedRef.current = onBotStarInitialised;

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isLoading) {
      // Don't do anything if we're told we're loading
      return;
    }

    if (isFirstLoad.current) {
      const widget = document.getElementById(botStarWidgetId);
      if (widget) {
        throw new Error(
          'Cannot have more than one BotStar widget instantiated at the same time!'
        );
      }
      isFirstLoad.current = false;
    }

    teardownBotStar(botStarWidgetId);
    setBotStarGlobalSettings({ appId, ...settings });
    setupBotStarApi();
    createBotStarWidgetScript(botStarWidgetId, onBotStarInitialisedRef.current);

    return () => teardownBotStar(botStarWidgetId);
  }, [appId, isLoading, settings]);

  return (
    <div {...props} className='chatbot-container'>
      {children}
    </div>
  );
};
