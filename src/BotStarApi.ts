import { BotStarSettings } from './BotStarSettings';

export type BotStarApiFunc = ((
  method: 'boot',
  settings: Partial<BotStarSettings>
) => void) &
  ((method: 'open') => void) &
  ((method: 'close') => void) &
  ((method: 'update', updateData: Partial<BotStarSettings>) => void) &
  ((method: 'onOpen', onOpenListener: () => void) => void) &
  ((method: 'onClose', onCloseListener: () => void) => void);

export const createBotStarApi = () => {
  // Reconstructed from the BotStar Snippet
  const BotStarApi: {
    (): void;
    q: any[];
  } = function () {
    (BotStarApi.q = BotStarApi.q || []).push(arguments);
  };
  BotStarApi.q = BotStarApi.q || [];

  return BotStarApi as BotStarApiFunc;
};
