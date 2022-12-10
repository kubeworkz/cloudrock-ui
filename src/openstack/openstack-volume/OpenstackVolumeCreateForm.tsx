import React from 'react';
import { useAsync } from 'react-use';

import { ENV } from '@cloudrock/configs/default';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { required } from '@cloudrock/core/validators';
import { isFeatureVisible } from '@cloudrock/features/connect';
import {
  NumberField,
  TextField,
  StringField,
  FormContainer,
  SelectField,
} from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { parseIntField } from '@cloudrock/marketplace/common/utils';
import { ProjectField } from '@cloudrock/marketplace/details/ProjectField';
import { OfferingConfigurationFormProps } from '@cloudrock/marketplace/types';
import { getVolumeNameValidators } from '@cloudrock/openstack/utils';

import { loadVolumeAvailabilityZones, loadVolumeTypes } from '../api';
import {
  formatVolumeTypeChoices,
  getDefaultVolumeType,
} from '../openstack-instance/utils';

const validateSize = (value: number) =>
  value < 1024 || value > 1024 * 10240
    ? translate('Size should be between 1 and 10240 GB.')
    : undefined;

const loadData = async (settings) => {
  const zones = await loadVolumeAvailabilityZones(settings);
  if (isFeatureVisible('openstack.volume_types')) {
    const volumeTypes = await loadVolumeTypes(settings);
    return {
      zones,
      volumeTypes: formatVolumeTypeChoices(volumeTypes),
      defaultVolumeType: getDefaultVolumeType(
        formatVolumeTypeChoices(volumeTypes),
      ),
    };
  } else {
    return {
      zones,
      volumeTypes: [],
      defaultVolumeType: undefined,
    };
  }
};

export const OpenstackVolumeCreateForm: React.FC<OfferingConfigurationFormProps> =
  (props) => {
    const state = useAsync(
      () => loadData(props.offering.scope_uuid),
      [props.offering.scope_uuid],
    );

    React.useEffect(() => {
      if (!state.value) {
        return;
      }
      props.initialize({
        attributes: {
          size: 1024,
          type: state.value.defaultVolumeType,
          ...props.initialAttributes,
        },
      });
    }, [state.value]);

    if (state.loading) {
      return <LoadingSpinner />;
    }

    if (state.error) {
      return <h3>{translate('Unable to load offering details.')}</h3>;
    }

    if (!state.value) {
      return null;
    }

    return (
      <form className="form-horizontal">
        <FormContainer
          submitting={props.submitting}
          labelClass="col-sm-3"
          controlClass="col-sm-9"
        >
          <ProjectField />
          <StringField
            label={translate('Volume name')}
            required={true}
            name="attributes.name"
            validate={getVolumeNameValidators()}
          />
          <NumberField
            label={translate('Size')}
            name="attributes.size"
            parse={parseIntField}
            min={1}
            max={10240}
            format={(v) => (v ? v / 1024 : '')}
            normalize={(v) => Number(v) * 1024}
            unit={translate('GB')}
            validate={validateSize}
          />
          {state.value.zones.length > 0 && (
            <SelectField
              label={translate('Availability zone')}
              name="attributes.availability_zone"
              options={state.value.zones}
              getOptionValue={(option) => option.url}
              getOptionLabel={(option) => option.name}
              simpleValue={true}
              required={
                ENV.plugins.CLOUDROCK_OPENSTACK_TENANT.REQUIRE_AVAILABILITY_ZONE
              }
              validate={
                ENV.plugins.CLOUDROCK_OPENSTACK_TENANT.REQUIRE_AVAILABILITY_ZONE
                  ? required
                  : undefined
              }
              isClearable={true}
            />
          )}
          {state.value.volumeTypes.length > 0 && (
            <SelectField
              label={translate('Volume type')}
              name="attributes.type"
              options={state.value.volumeTypes}
              required={true}
              isClearable={true}
            />
          )}
          <TextField
            label={translate('Description')}
            name="attributes.description"
            maxLength={2000}
          />
        </FormContainer>
      </form>
    );
  };
