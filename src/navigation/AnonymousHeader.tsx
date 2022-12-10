import { FunctionComponent, useState } from 'react';

import { useOutsideClickHandler } from '@cloudrock/core/useOutsideClickHandler';
import { translate } from '@cloudrock/i18n';
import { Button } from '@cloudrock/marketplace/offerings/service-providers/shared/Button';
import { AnonymousLanguageSelector } from '@cloudrock/navigation/AnonymousLanguageSelector';
import { OfferingSearchField } from '@cloudrock/navigation/OfferingSearchField';
import { SearchResultsDropdown } from '@cloudrock/navigation/SearchResultsDropdown';
import { router } from '@cloudrock/router';
import './AnonymousHeader.scss';

export const AnonymousHeader: FunctionComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { wrapperRef, toggle, setToggle } = useOutsideClickHandler();
  return (
    <div className="anonymousHeader white-bg" ref={wrapperRef}>
      <div className="anonymousHeader__header">
        <OfferingSearchField
          onSearch={(query: string) => {
            setToggle(true);
            setQuery(query);
            setPageIndex(1);
          }}
          onFocus={() => setToggle(true)}
        />
        <div className="anonymousHeader__actions">
          <AnonymousLanguageSelector />
          <Button
            label={translate('Log in')}
            onClick={() => router.stateService.go('login')}
          />
        </div>
      </div>
      {toggle && (
        <SearchResultsDropdown
          query={query}
          pageIndex={pageIndex}
          onPageChange={(newPageIndex: number) => {
            setPageIndex(newPageIndex);
          }}
        />
      )}
    </div>
  );
};
