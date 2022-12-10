import { FunctionComponent } from 'react';

import { TimezoneField } from '@cloudrock/form/TimezoneField';
import { translate } from '@cloudrock/i18n';
import { FormGroup } from '@cloudrock/marketplace/offerings/FormGroup';

interface TimeZoneGroupProps {
  timeZone: string;
  setTimeZone(val: string): void;
}

export const TimeZoneGroup: FunctionComponent<TimeZoneGroupProps> = ({
  timeZone,
  setTimeZone,
}) => (
  <FormGroup
    label={translate('Time zone')}
    labelClassName="control-label col-sm-3"
    valueClassName={'col-sm-8'}
  >
    <TimezoneField
      isSearchable={true}
      isClearable={false}
      input={{ value: timeZone, onChange: setTimeZone }}
    />
  </FormGroup>
);
