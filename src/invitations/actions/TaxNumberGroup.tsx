import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';

import { InputGroup } from './InputGroup';

export const TaxNumberGroup: FunctionComponent<{ disabled }> = ({ disabled }) =>
  isFeatureVisible('invitation.show_tax_number') ? (
    <InputGroup
      name="tax_number"
      label={
        ENV.plugins.CLOUDROCK_CORE.INVITATION_TAX_NUMBER_LABEL ||
        translate('Tax number')
      }
      required={isFeatureVisible('invitation.tax_number_required')}
      disabled={disabled}
    />
  ) : null;
