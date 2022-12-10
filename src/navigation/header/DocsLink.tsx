import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';

export const DocsLink: FunctionComponent = () => {
  const link = ENV.plugins.CLOUDROCK_CORE.DOCS_URL;
  if (!link) {
    return null;
  }
  return (
    <li>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {translate('Documentation')}
      </a>
    </li>
  );
};
