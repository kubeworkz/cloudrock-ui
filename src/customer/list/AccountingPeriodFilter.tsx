import { FunctionComponent } from 'react';

import { PeriodOption } from '@cloudrock/form/types';
import { translate } from '@cloudrock/i18n';

import { AccountingPeriodField } from './AccountingPeriodField';

interface AccountingPeriodFilterProps {
  options: PeriodOption[];
}

export const AccountingPeriodFilter: FunctionComponent<AccountingPeriodFilterProps> =
  (props) => (
    <div className="form-group col-sm-3">
      <label className="control-label">{translate('Accounting period')}</label>
      <AccountingPeriodField options={props.options} />
    </div>
  );
