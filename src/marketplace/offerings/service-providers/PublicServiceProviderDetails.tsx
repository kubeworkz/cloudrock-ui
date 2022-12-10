import { useCurrentStateAndParams } from '@uirouter/react';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncFn, useEffectOnce } from 'react-use';

import { clearTokenHeader } from '@cloudrock/auth/AuthService';
import { removeToken } from '@cloudrock/auth/TokenStorage';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { InvalidRoutePage } from '@cloudrock/error/InvalidRoutePage';
import { translate } from '@cloudrock/i18n';
import { getServiceProviderByCustomer } from '@cloudrock/marketplace/common/api';
import { ServiceProvider } from '@cloudrock/marketplace/offerings/service-providers/ServiceProvider';
import { AnonymousHeader } from '@cloudrock/navigation/AnonymousHeader';
import { useTitle } from '@cloudrock/navigation/title';
import { ANONYMOUS_CONFIG } from '@cloudrock/table/api';
import { getCurrentUser } from '@cloudrock/user/UsersService';
import { setCurrentUser } from '@cloudrock/workspace/actions';

export const PublicServiceProviderDetails: FunctionComponent = () => {
  const dispatch = useDispatch();
  useTitle(translate('Service provider'));
  const {
    params: { uuid },
  } = useCurrentStateAndParams();
  const [{ loading, error, value: serviceProvider }, refreshServiceProvider] =
    useAsyncFn(async () => {
      try {
        const user = await getCurrentUser({ __skipLogout__: true });
        dispatch(setCurrentUser(user));
      } catch (e) {
        if (e.response.status == 401) {
          removeToken();
          clearTokenHeader();
        }
      }

      return await getServiceProviderByCustomer(
        {
          customer_uuid: uuid,
        },
        ANONYMOUS_CONFIG,
      );
    });

  useEffectOnce(() => {
    refreshServiceProvider();
  });

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <p>{translate('Unable to load the service provider.')}</p>
  ) : serviceProvider ? (
    <>
      <AnonymousHeader />
      <ServiceProvider
        serviceProvider={serviceProvider}
        refreshServiceProvider={refreshServiceProvider}
      />
    </>
  ) : (
    <InvalidRoutePage />
  );
};
