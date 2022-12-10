import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';
import './Description.scss';

export const Description: FunctionComponent = () => (
  <div className="description">
    <h1>
      {translate('Welcome to {pageTitle}!', {
        pageTitle: ENV.plugins.CLOUDROCK_CORE.SHORT_PAGE_TITLE,
      })}
    </h1>
    <p>{ENV.plugins.CLOUDROCK_CORE.SITE_DESCRIPTION}</p>
  </div>
);
