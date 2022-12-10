import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { goBack } from '@cloudrock/navigation/utils';

export const InvalidRoutePage: FunctionComponent = () => {
  useTitle(translate('Object is not found.'));
  return (
    <div className="middle-box text-center">
      <h1>404</h1>
      <p className="font-bold">
        {translate(
          "Page is not found. You've either entered invalid URL or trying to reach disabled feature.",
        )}
      </p>
      <p>
        <a onClick={goBack}>&lt; {translate('Back')}</a>
      </p>
    </div>
  );
};
