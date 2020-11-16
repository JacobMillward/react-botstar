# react-botstar

Easily integrate BotStar widgets into your react application.

## How to use

Just include the component, and set the `appId` to the Id of your bot. An optional `settings` object can be provided to set custom settings.

A callback `onBotStarInitialised` can be set to receive a reference the the BotStarApi function, after the bot has initialised.

```
import { BotStarWidget } from 'react-botstar';

export const MyBot = (props) => (
  const [botStarApi, setBotStarApi] = useState(null);

  <BotStarWidget
    appId="some-id-here"

    settings={{
      user: {
        email: 'joe@bloggs.com'
      }

      onBotStarInitialised={ (api) => setBotStarApi(api) }
    }} />);
```

By default, displays the bot in `inline` mode.