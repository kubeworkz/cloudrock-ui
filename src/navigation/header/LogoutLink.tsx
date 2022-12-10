import { FunctionComponent } from 'react';

import { AuthService } from '@cloudrock/auth/AuthService';
import { translate } from '@cloudrock/i18n';

export const LogoutLink: FunctionComponent = () => {
  return (
    <li>
      <a onClick={AuthService.logout}>
        <i className="fa fa-sign-out"></i> {translate('Log out')}
      </a>
    </li>
  );
};
