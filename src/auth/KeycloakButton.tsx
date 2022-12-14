import { ENV } from '@cloudrock/configs/default';

import { LoginButton } from './LoginButton';
import { getOauthCallback } from './utils';

const KeycloakLogo = require('./KeycloakLogo.svg');

export const KeycloakButton = () => (
  <LoginButton
    label={ENV.plugins.CLOUDROCK_AUTH_SOCIAL.KEYCLOAK_LABEL}
    image={KeycloakLogo}
    onClick={getOauthCallback({
      name: 'keycloak',
      clientId: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.KEYCLOAK_CLIENT_ID,
      authUrl: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.KEYCLOAK_AUTH_URL,
      scope: 'openid',
    })}
  />
);
