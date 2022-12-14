import { FunctionComponent } from 'react';

import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';

export const MainSearch: FunctionComponent = () =>
  isFeatureVisible('mainSearch') ? (
    <div role="search" className="navbar-form-custom">
      <div className="form-group">
        <input
          type="text"
          placeholder={translate('Search')}
          className="form-control"
          name="top-search"
          id="top-search"
        />
      </div>
    </div>
  ) : null;
