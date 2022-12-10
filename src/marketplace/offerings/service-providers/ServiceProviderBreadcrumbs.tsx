import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { AnonymousBreadcrumbsContainer } from '@cloudrock/marketplace/offerings/service-providers/shared/AnonymousBreadcrumbsContainer';
import { ServiceProvider } from '@cloudrock/marketplace/types';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import './ServiceProviderBreadcrumbs.scss';

const getBreadcrumbs = (serviceProvider: ServiceProvider): BreadcrumbItem[] => [
  {
    label: translate('Service providers'),
    state: 'marketplace-service-providers.details',
  },
  {
    label:
      serviceProvider.customer_abbreviation || serviceProvider.customer_name,
  },
];

interface ServiceProviderBreadcrumbsProps {
  serviceProvider: ServiceProvider;
}

export const ServiceProviderBreadcrumbs: FunctionComponent<ServiceProviderBreadcrumbsProps> =
  ({ serviceProvider }) => {
    useBreadcrumbsFn(
      () => (serviceProvider ? getBreadcrumbs(serviceProvider) : []),
      [serviceProvider],
    );
    return serviceProvider ? (
      <div className="serviceProviderBreadcrumbsContainer">
        <AnonymousBreadcrumbsContainer />
      </div>
    ) : null;
  };
