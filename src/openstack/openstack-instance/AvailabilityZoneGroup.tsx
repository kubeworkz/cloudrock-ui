import { FunctionComponent } from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';

import { ENV } from '@cloudrock/configs/default';
import { required } from '@cloudrock/core/validators';
import { translate } from '@cloudrock/i18n';

import { CreateResourceFormGroup } from '../CreateResourceFormGroup';

export const AvailabilityZoneGroup: FunctionComponent<any> = (props) =>
  props.availabilityZones.length > 0 ? (
    <CreateResourceFormGroup
      label={translate('Availability zone')}
      required={ENV.plugins.CLOUDROCK_OPENSTACK_TENANT.REQUIRE_AVAILABILITY_ZONE}
    >
      <Field
        name="attributes.availability_zone"
        validate={
          ENV.plugins.CLOUDROCK_OPENSTACK_TENANT.REQUIRE_AVAILABILITY_ZONE
            ? required
            : undefined
        }
        component={(fieldProps) => (
          <Select
            value={props.availabilityZones.filter(
              (zone) => zone.url === fieldProps.input.value,
            )}
            onChange={(newValue) => fieldProps.input.onChange(newValue.url)}
            options={props.availabilityZones}
            getOptionValue={(option) => option.url}
            getOptionLabel={(option) => option.name}
            isClearable={true}
          />
        )}
      />
    </CreateResourceFormGroup>
  ) : null;
