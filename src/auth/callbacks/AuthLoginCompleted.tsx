import { useCurrentStateAndParams, useRouter } from '@uirouter/react';
import { useCallback, useEffect, FunctionComponent } from 'react';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { UsersService } from '@cloudrock/user/UsersService';

import { AuthService } from '../AuthService';

export const AuthLoginCompleted: FunctionComponent = () => {
  const router = useRouter();
  const { params } = useCurrentStateAndParams();
  const completeAuth = useCallback(
    async (token, method) => {
      AuthService.setAuthHeader(token);
      const user = await UsersService.getCurrentUser();
      AuthService.loginSuccess({
        data: { ...user, method },
      });
      router.stateService.go('profile.details');
    },
    [router.stateService],
  );
  useEffect(() => {
    completeAuth(params.token, params.method);
  }, [completeAuth, params]);

  return (
    <div className="middle-box text-center">
      <LoadingSpinner />
      <h3>{translate('Logging user in')}</h3>
    </div>
  );
};
