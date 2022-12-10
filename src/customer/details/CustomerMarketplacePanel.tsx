import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { ServiceProviderManagement } from '@cloudrock/marketplace/service-providers/ServiceProviderManagement';
import { getCustomer } from '@cloudrock/workspace/selectors';

export const CustomerMarketplacePanel: FunctionComponent = () => {
  const customer = useSelector(getCustomer);
  return (
    <div className="highlight">
      <h3>{translate('Service provider')}</h3>
      {!customer.is_service_provider && (
        <p>
          {translate(
            'You can register organization as a service provider by pressing the button below',
          )}
        </p>
      )}
      <ServiceProviderManagement />
    </div>
  );
};
