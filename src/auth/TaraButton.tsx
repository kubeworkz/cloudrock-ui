import { ENV } from '@cloudrock/configs/default';

import { LoginButton } from './LoginButton';
import { getOauthCallback } from './utils';

const TaraLogo = require('./TaraLogo.svg');

export const TaraButton = () => (
  <LoginButton
    image={TaraLogo}
    label={ENV.plugins.CLOUDROCK_AUTH_SOCIAL.TARA_LABEL}
    onClick={getOauthCallback({
      name: 'tara',
      clientId: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.TARA_CLIENT_ID,
      authUrl: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.TARA_SANDBOX
        ? 'https://tara-test.ria.ee/oidc/authorize'
        : 'https://tara.ria.ee/oidc/authorize',
      scope: 'openid',
    })}
  />
);
