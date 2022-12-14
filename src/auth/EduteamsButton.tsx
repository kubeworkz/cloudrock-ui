import { ENV } from '@cloudrock/configs/default';

import { LoginButton } from './LoginButton';
import { getOauthCallback } from './utils';

const logoEduteams = require('./EduteamsLogo.png');
const logoMyaccessid = require('./MyaccessidLogo.svg');

export const EduteamsButton = () => (
  <LoginButton
    image={
      ENV.plugins.CLOUDROCK_AUTH_SOCIAL.EDUTEAMS_LABEL === 'MyAccessID'
        ? logoMyaccessid
        : logoEduteams
    }
    label={ENV.plugins.CLOUDROCK_AUTH_SOCIAL.EDUTEAMS_LABEL}
    onClick={getOauthCallback({
      name: 'eduteams',
      clientId: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.EDUTEAMS_CLIENT_ID,
      authUrl: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.EDUTEAMS_AUTH_URL,
      scope: 'openid profile email eduperson_assurance ssh_public_key',
    })}
  />
);
