import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { goBack } from '@cloudrock/navigation/utils';

export const InvalidQuotaPage: FunctionComponent = () => {
  useTitle(translate('Quota has been reached.'));
  return (
    <div className="middle-box text-center">
      <h1>403</h1>
      <p className="font-bold">
        {translate('You have exceeded maximum number of quotas.')}
      </p>
      <p>
        <a onClick={goBack}>&lt; {translate('Back')}</a>
      </p>
    </div>
  );
};
