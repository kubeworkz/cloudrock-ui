import { FunctionComponent } from 'react';

import { AuthService } from '@cloudrock/auth/AuthService';
import { translate } from '@cloudrock/i18n';
import { UsersService } from '@cloudrock/user/UsersService';

import { goBack } from '../utils';

import './SiteHeader.scss';

export const SiteHeader: FunctionComponent = () => {
  return (
    <div className="border-bottom">
      <nav className="navbar navbar-static-top white-bg m-b-none">
        <div className="navbar-header m-l-sm-xl">
          <a className="header-logo" onClick={goBack}>
            <img src="images/login_logo.png" />
          </a>
        </div>
        <ul className="nav navbar-top-links pull-right">
          {AuthService.isAuthenticated() && UsersService.isCurrentUserValid() && (
            <li>
              <a onClick={goBack}>
                <i className="fa fa-arrow-left" /> {translate('Back')}
              </a>
            </li>
          )}
          {AuthService.isAuthenticated() && (
            <li>
              <a onClick={() => AuthService.logout()}>
                <i className="fa fa-sign-out" /> {translate('Log out')}
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
