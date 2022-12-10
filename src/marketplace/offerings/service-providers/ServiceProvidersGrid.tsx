import { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SERVICE_PROVIDERS_GRID } from '@cloudrock/marketplace/offerings/service-providers/constants';
import { GRID_PAGE_SIZE_CONFIG } from '@cloudrock/marketplace/offerings/service-providers/shared/grid/constants';
import Grid from '@cloudrock/marketplace/offerings/service-providers/shared/grid/Grid';
import { ServiceProviderDetailsCard } from '@cloudrock/marketplace/offerings/service-providers/shared/ServiceProviderDetailsCard';
import { connectTable, createFetcher } from '@cloudrock/table';
import { updatePageSize } from '@cloudrock/table/actions';
import { ANONYMOUS_CONFIG } from '@cloudrock/table/api';

const GridComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePageSize(SERVICE_PROVIDERS_GRID, GRID_PAGE_SIZE_CONFIG));
  }, [dispatch]);
  return (
    <Grid
      {...props}
      verboseName={translate('Service providers')}
      hasQuery={true}
      queryPlaceholder={translate('Search by name or abbreviation')}
      gridItemComponent={ServiceProviderDetailsCard}
    />
  );
};

const GridOptions = {
  table: SERVICE_PROVIDERS_GRID,
  fetchData: createFetcher('marketplace-service-providers', ANONYMOUS_CONFIG),
  queryField: 'customer_keyword',
};

export const ServiceProvidersGrid = connectTable(GridOptions)(GridComponent);
