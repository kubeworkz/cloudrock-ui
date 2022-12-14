import Qs from 'qs';
import { FunctionComponent } from 'react';

import { Link } from '@cloudrock/core/Link';
import { getQueryString } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';

export const AuthLoginFailed: FunctionComponent = () => {
  const qs = Qs.parse(getQueryString());
  const message = qs?.message;

  return (
    <div className="middle-box text-center">
      <h3 className="app-title centered">{translate('Login failed')}</h3>
      {message && <p className="m-t-md">{message}</p>}
      <p className="m-t-md">
        <Link state="login"> &lt; {translate('Back to login')} </Link>
      </p>
    </div>
  );
};
