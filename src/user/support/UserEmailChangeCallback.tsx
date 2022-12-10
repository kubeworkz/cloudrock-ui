import { triggerTransition } from '@uirouter/redux';
import { useEffect, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { AuthService } from '@cloudrock/auth/AuthService';
import { post } from '@cloudrock/core/api';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { wait } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';
import { router } from '@cloudrock/router';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { setCurrentUser } from '@cloudrock/workspace/actions';

import { getCurrentUser } from '../UsersService';

export const UserEmailChangeCallback: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      try {
        await post('/users/confirm_email/', {
          code: router.globals.params.token,
        });
        dispatch(showSuccess(translate('Email has been updated.')));
      } catch (error) {
        dispatch(
          showErrorResponse(error, translate('Unable to confirm email.')),
        );
      }

      if (!AuthService.isAuthenticated()) {
        dispatch(triggerTransition('login', {}));
        return;
      }

      let currentUser;
      try {
        currentUser = await getCurrentUser();
      } catch (error) {
        dispatch(
          showErrorResponse(error, translate('Unable to fetch current user.')),
        );
      }

      if (currentUser) {
        dispatch(setCurrentUser(currentUser));
        await wait(1000);
      }
      dispatch(triggerTransition('profile.manage', {}));
    }
    load();
  }, [dispatch]);

  return (
    <div className="middle-box text-center">
      <LoadingSpinner />
      <h3 className="app-title centered">
        {translate('Verifying email change')}
      </h3>
    </div>
  );
};
