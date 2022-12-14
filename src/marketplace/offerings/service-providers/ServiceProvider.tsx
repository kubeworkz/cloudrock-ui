import { FunctionComponent, useState } from 'react';

import { ServiceProvider as ServiceProviderType } from '@cloudrock/marketplace/types';

import { ServiceProviderBreadcrumbs } from './ServiceProviderBreadcrumbs';
import { ServiceProviderHeader } from './ServiceProviderHeader';
import { ServiceProviderOfferingsCategoriesFilter } from './ServiceProviderOfferingsCategoriesFilter';
import { ServiceProviderOfferingsFilterBar } from './ServiceProviderOfferingsFilterBar';
import { ServiceProviderOfferingsGrid } from './ServiceProviderOfferingsGrid';
import './ServiceProvider.scss';

interface ServiceProviderProps {
  serviceProvider: ServiceProviderType;
  refreshServiceProvider(): void;
}

export const ServiceProvider: FunctionComponent<ServiceProviderProps> = ({
  serviceProvider,
  refreshServiceProvider,
}) => {
  const [queryFilter, setQueryFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  return (
    <div className="serviceProvider m-b-md">
      <ServiceProviderHeader
        serviceProvider={serviceProvider}
        refreshServiceProvider={refreshServiceProvider}
      />
      <ServiceProviderBreadcrumbs serviceProvider={serviceProvider} />
      <div className="serviceProvider__content">
        <ServiceProviderOfferingsCategoriesFilter
          serviceProviderUuid={serviceProvider.customer_uuid}
          onQueryFilterChange={setQueryFilter}
          onCategoryChange={setCategoryFilter}
        />
        <div className="serviceProvider__grid">
          {categoryFilter && (
            <ServiceProviderOfferingsFilterBar categoryUuid={categoryFilter} />
          )}
          <ServiceProviderOfferingsGrid
            serviceProviderUuid={serviceProvider.customer_uuid}
            query={queryFilter}
            categoryUuid={categoryFilter}
          />
        </div>
      </div>
    </div>
  );
};
