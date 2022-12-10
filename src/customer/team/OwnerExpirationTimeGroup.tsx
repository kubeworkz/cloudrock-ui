import { DateTime } from 'luxon';
import { FunctionComponent } from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import { Field } from 'redux-form';

import { DateField } from '@cloudrock/form/DateField';
import { datePickerOverlayContainerInDialogs } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';

interface OwnerExpirationTimeGroupProps {
  disabled?: boolean;
}

export const OwnerExpirationTimeGroup: FunctionComponent<OwnerExpirationTimeGroupProps> =
  ({ disabled }) => (
    <FormGroup>
      <ControlLabel>
        {translate('Organization owner role expires on')}
      </ControlLabel>
      <Field
        name="expiration_time"
        component={DateField}
        disabled={disabled}
        minDate={DateTime.now().plus({ days: 1 }).toISO()}
        weekStartsOn={1}
        {...datePickerOverlayContainerInDialogs()}
      />
    </FormGroup>
  );

OwnerExpirationTimeGroup.defaultProps = {
  disabled: false,
};
