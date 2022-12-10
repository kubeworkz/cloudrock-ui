import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';

import './PoweredBy.scss';

export const PoweredBy: FunctionComponent = () =>
  ENV.plugins.CLOUDROCK_CORE.POWERED_BY_LOGO ? (
    <div className="powered-by">
      <div>{translate('Powered by')}</div>
      <div>
        <img src={ENV.plugins.CLOUDROCK_CORE.POWERED_BY_LOGO} />
      </div>
    </div>
  ) : null;
