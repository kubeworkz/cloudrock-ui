import { useEffect, FunctionComponent } from 'react';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';

import { AuthService } from '../AuthService';

export const AuthLogoutCompleted: FunctionComponent = () => {
  useEffect(() => {
    AuthService.localLogout();
  }, []);
  return (
    <div className="middle-box text-center">
      <LoadingSpinner />
      <h3>
        {translate(
          'User has been logged out. You will be redirected to the login page soon.',
        )}
      </h3>
    </div>
  );
};
