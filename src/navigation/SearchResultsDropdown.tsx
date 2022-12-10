import { FunctionComponent, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAsyncFn } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { fetchOfferings } from '@cloudrock/navigation/api';
import { SearchResults } from '@cloudrock/navigation/SearchResults';
import { ServiceProviderOfferingsPaging } from '@cloudrock/navigation/ServiceProviderOfferingsPaging';
import './SearchResultsDropdown.scss';

const illustration: string = require('@cloudrock/images/table-placeholders/undraw_no_data_qbuo.svg');

interface SearchResultsDropdownProps {
  query: string;
  pageIndex: number;
  onPageChange: (newPageIndex: number) => void;
}

export const SearchResultsDropdown: FunctionComponent<SearchResultsDropdownProps> =
  ({ query, pageIndex, onPageChange }) => {
    const [{ loading, error, value }, loadData] = useAsyncFn<any>(
      () => fetchOfferings(query, pageIndex),
      [query, pageIndex],
    );

    useEffect(() => {
      loadData();
    }, [query, pageIndex]);

    return (
      <div className="searchResultsDropdown">
        {loading ? (
          <div className="searchResultsDropdown__loadingSpinner">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="searchResultsDropdown__error">
            <p>{translate('Unable to fetch offerings')}</p>
            <Button bsStyle="primary" onClick={() => loadData()}>
              <i className="fa fa-refresh"></i> {translate('Retry')}
            </Button>
          </div>
        ) : value?.items?.length === 0 ? (
          <div className="searchResultsDropdown__notFound">
            <img src={illustration} height={120} width="auto" />
            <p>{translate('No matching offerings found')}</p>
          </div>
        ) : value?.items?.length > 0 ? (
          <>
            <SearchResults offeringsByProvider={value.items} />
            <ServiceProviderOfferingsPaging
              pageIndex={pageIndex}
              onPageChange={onPageChange}
              offeringsByProvider={value.items}
              totalItems={value.totalItems}
            />
          </>
        ) : null}
      </div>
    );
  };
