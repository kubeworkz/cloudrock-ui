import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';

import { InputGroup } from './InputGroup';

export const CivilNumberGroup: FunctionComponent<{ disabled }> = ({
  disabled,
}) => (
  <InputGroup
    name="civil_number"
    label={
      ENV.plugins.CLOUDROCK_CORE.INVITATION_CIVIL_NUMBER_LABEL ||
      translate('Civil number')
    }
    required={isFeatureVisible('invitation.civil_number_required')}
    disabled={disabled}
    helpText={ENV.plugins.CLOUDROCK_CORE.INVITATION_CIVIL_NUMBER_HELP_TEXT}
  />
);
