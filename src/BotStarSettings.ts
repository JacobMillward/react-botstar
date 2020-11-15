export interface BotStarUserAttributes {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  gender?: 'male' | 'female' | '';
  birthday: string;
  avatar: string;
  tags: string[];
  [k: string]: any;
}

export interface BotStarSettings {
  appId: string;
  mode: 'livechat' | 'inline' | 'popup' | 'fullpage';
  user: Partial<BotStarUserAttributes>;
  variables: { [k: string]: any };
  block: string;
}
