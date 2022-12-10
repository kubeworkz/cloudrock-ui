import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';

import { clearTokenHeader } from '@cloudrock/auth/AuthService';
import { removeToken } from '@cloudrock/auth/TokenStorage';
import { ENV } from '@cloudrock/configs/default';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { ServiceProvidersGrid } from '@cloudrock/marketplace/offerings/service-providers/ServiceProvidersGrid';
import { ServiceProvidersHeader } from '@cloudrock/marketplace/offerings/service-providers/ServiceProvidersHeader';
import { AnonymousHeader } from '@cloudrock/navigation/AnonymousHeader';
import { useTitle } from '@cloudrock/navigation/title';
import { getCurrentUser } from '@cloudrock/user/UsersService';

import './ServiceProvidersContainer.scss';

export const ServiceProvidersContainer: FunctionComponent = () => {
  const title = translate('Service providers in {title}', {
    title: ENV.plugins.CLOUDROCK_CORE.SHORT_PAGE_TITLE,
  });
  const { loading, error } = useAsync(async () => {
    try {
      await getCurrentUser({ __skipLogout__: true });
    } catch (e) {
      if (e.response.status == 401) {
        removeToken();
        clearTokenHeader();
      }
    }
  });
  useTitle(title);
  if (loading) {
    return <LoadingSpinner />;
  } else if (error) {
    return <h3>{translate('Unable to fetch current user')}</h3>;
  } else {
    return (
      <>
        <AnonymousHeader />
        <div className="serviceProvidersContainer">
          <ServiceProvidersHeader />
          <ServiceProvidersGrid />
        </div>
      </>
    );
  }
};
