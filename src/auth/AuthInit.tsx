import { useRouter } from '@uirouter/react';
import { useCallback, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useAsync } from 'react-use';

import { ENV } from '@cloudrock/configs/default';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { pick } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { UserEditContainer } from '@cloudrock/user/support/UserEditContainer';
import { UsersService } from '@cloudrock/user/UsersService';
import { setCurrentUser } from '@cloudrock/workspace/actions';

const formatInitialData = pick([
  'uuid',
  'agree_with_policy',
  'full_name',
  'native_name',
  'organization',
  'job_title',
  'description',
  'phone_number',
]);

export const AuthInit: FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    value: user,
  } = useAsync(() => UsersService.getCurrentUser());
  const onSave = useCallback(
    async (user) => {
      try {
        const response = await UsersService.update(formatInitialData(user));
        dispatch(setCurrentUser(response.data));
        router.stateService.go('profile.details');
        dispatch(showSuccess(translate('User has been updated.')));
      } catch (error) {
        dispatch(showErrorResponse(error, translate('Unable to save user.')));
      }
    },
    [dispatch, router.stateService],
  );
  return loading ? (
    <div className="wrapper">
      <div className="row m-t-xl">
        <LoadingSpinner />
      </div>
    </div>
  ) : error ? (
    <>{translate('Unable to load user.')}</>
  ) : (
    <div className="wrapper">
      <div className="row m-t-md">
        <div className="col-md-6 col-md-offset-3 col-xs-12 col-lg-6 col-lg-offset-3">
          <h2>
            {translate('Welcome to {pageTitle}!', {
              pageTitle: ENV.plugins.CLOUDROCK_CORE.SHORT_PAGE_TITLE,
            })}
          </h2>
          <p>
            {translate(
              'To get your clouds under control, please fill in your data.',
            )}
          </p>
        </div>
      </div>
      <div className="row initial-data-page">
        <div className="ibox col-md-offset-2 col-md-8 col-lg-6 col-lg-offset-3">
          <div className="ibox-content">
            <UserEditContainer user={user} onSave={onSave} initial={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
