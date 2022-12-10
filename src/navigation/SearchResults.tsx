import { FunctionComponent } from 'react';

import { OfferingsByServiceProvider } from '@cloudrock/marketplace/types';
import { SearchResultItem } from '@cloudrock/navigation/SearchResultItem';

interface SearchResultsProps {
  offeringsByProvider: OfferingsByServiceProvider[];
}

export const SearchResults: FunctionComponent<SearchResultsProps> = ({
  offeringsByProvider,
}) => (
  <>
    {offeringsByProvider.map((item: OfferingsByServiceProvider, i: number) => (
      <SearchResultItem key={i} item={item} />
    ))}
  </>
);
