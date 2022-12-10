import Qs from 'qs';

import { ENV } from '@cloudrock/configs/default';

import { LoginButton } from './LoginButton';

export const Saml2DiscoveryButton = () => (
  <LoginButton
    iconClass="fa-globe"
    label={ENV.plugins.CLOUDROCK_AUTH_SAML2.DISCOVERY_SERVICE_LABEL}
    onClick={() => {
      const discovery = ENV.plugins.CLOUDROCK_AUTH_SAML2.DISCOVERY_SERVICE_URL;
      const params = {
        entityID: `${ENV.plugins.CLOUDROCK_CORE.METAL_URL}/api-auth/saml2/metadata/`,
        return: `${window.location.origin}/saml2_discovery_completed/`,
      };
      window.location.href = `${discovery}?${Qs.stringify(params)}`;
    }}
  />
);
