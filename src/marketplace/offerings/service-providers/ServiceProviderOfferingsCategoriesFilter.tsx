import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';
import './ServiceProviderOfferingsCategoriesFilter.scss';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { getCategories } from '@cloudrock/marketplace/common/api';
import { CategoriesList } from '@cloudrock/marketplace/offerings/service-providers/CategoriesList';
import { ServiceProviderOfferingsQueryFilter } from '@cloudrock/marketplace/offerings/service-providers/ServiceProviderOfferingsQueryFilter';
import { Category } from '@cloudrock/marketplace/types';
import { ANONYMOUS_CONFIG } from '@cloudrock/table/api';

interface ServiceProviderOfferingsCategoriesFilterProps {
  serviceProviderUuid: string;
  onQueryFilterChange: (query: string) => void;
  onCategoryChange: (newCategory: string) => void;
}

export const ServiceProviderOfferingsCategoriesFilter: FunctionComponent<ServiceProviderOfferingsCategoriesFilterProps> =
  ({ serviceProviderUuid, onQueryFilterChange, onCategoryChange }) => {
    const {
      loading,
      error,
      value: categories,
    } = useAsync<Category[]>(
      () =>
        getCategories({
          params: {
            customer_uuid: serviceProviderUuid,
            has_offerings: true,
            has_shared: true,
          },
          ...ANONYMOUS_CONFIG,
        }),
      [serviceProviderUuid],
    );
    return loading ? (
      <LoadingSpinner />
    ) : error ? (
      <h3>{translate('Unable to load categories.')}</h3>
    ) : categories?.length ? (
      <div className="offeringsCategoriesFilter">
        <ServiceProviderOfferingsQueryFilter
          onQueryChange={onQueryFilterChange}
        />
        <CategoriesList
          categories={categories}
          onCategoryChange={onCategoryChange}
        />
      </div>
    ) : null;
  };
