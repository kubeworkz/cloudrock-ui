import { useDispatch, useSelector } from 'react-redux';
import { useAsyncFn, useEffectOnce } from 'react-use';

import { ENV } from '@cloudrock/configs/default';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { router } from '@cloudrock/router';
import { showError } from '@cloudrock/store/notify';
import { getUser } from '@cloudrock/workspace/selectors';

import { getProfile } from './api';
import { FreeIPAAccountCreate } from './FreeIPAAccountCreate';
import { FreeIPAAccountEdit } from './FreeIPAAccountEdit';

export const FreeIpaAccount = () => {
  useTitle(translate('FreeIPA account'));
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  if (!ENV.plugins.CLOUDROCK_FREEIPA?.ENABLED) {
    dispatch(showError(translate('FreeIPA extension is disabled.')));
    router.stateService.go('errorPage.notFound');
  }

  const [{ loading, error, value: profile }, refreshProfile] = useAsyncFn(
    () => getProfile(user.uuid),
    [user.uuid],
  );

  useEffectOnce(() => {
    refreshProfile();
  });

  if (loading) return <LoadingSpinner />;

  if (error) return <>{translate('Unable to load data.')}</>;

  return (
    <div className="wrapper wrapper-content">
      {profile ? (
        <FreeIPAAccountEdit profile={profile} refreshProfile={refreshProfile} />
      ) : (
        <FreeIPAAccountCreate onProfileAdded={refreshProfile} />
      )}
    </div>
  );
};
