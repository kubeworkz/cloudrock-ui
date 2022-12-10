import { useRouter, useCurrentStateAndParams } from '@uirouter/react';
import Axios from 'axios';
import Qs from 'qs';
import { useState, useEffect, FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { Link } from '@cloudrock/core/Link';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { getQueryString } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';
import { UsersService } from '@cloudrock/user/UsersService';

import { AuthService } from '../AuthService';
import { getRedirectUri } from '../utils';

const getClientId = (provider) =>
  ({
    keycloak: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.KEYCLOAK_CLIENT_ID,
    smartidee: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.SMARTIDEE_CLIENT_ID,
    tara: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.TARA_CLIENT_ID,
    eduteams: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.EDUTEAMS_CLIENT_ID,
  }[provider]);

export const OauthLoginCompleted: FunctionComponent = () => {
  const router = useRouter();
  const {
    params: { provider },
  } = useCurrentStateAndParams();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchToken() {
      const qs = Qs.parse(getQueryString());
      const url = `${ENV.apiEndpoint}api-auth/${provider}/`;
      try {
        const response = await Axios.post(url, {
          clientId: getClientId(provider),
          code: qs.code,
          state: qs.state,
          redirectUri: getRedirectUri(provider),
        });
        AuthService.setAuthHeader(response.data.token);
        const user = await UsersService.getCurrentUser();
        AuthService.loginSuccess({
          data: { ...user, method: provider },
        });
        AuthService.redirectOnSuccess();
      } catch (e) {
        setError(e.data.detail);
      }
    }
    fetchToken();
  }, [router, provider]);

  return error ? (
    <div className="middle-box text-center">
      <h3 className="app-title centered">{translate('Login failed')}</h3>
      {typeof error === 'string' && <p className="m-t-md">{error}</p>}
      <p className="m-t-md">
        <Link state="login"> &lt; {translate('Back to login')} </Link>
      </p>
    </div>
  ) : (
    <div className="middle-box text-center">
      <LoadingSpinner />
      <h3>{translate('Logging user in')}</h3>
    </div>
  );
};
