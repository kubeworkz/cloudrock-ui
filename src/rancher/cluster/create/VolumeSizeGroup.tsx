import { useMemo, FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';
import {
  parseIntField,
  formatIntField,
} from '@cloudrock/marketplace/common/utils';
import { FormGroup } from '@cloudrock/marketplace/offerings/FormGroup';

import { getMinSize } from './getMinSize';
import { IntegerUnitField } from './IntegerUnitField';
import { getDataVolumes } from './utils';

const createVolumeSizeValidator =
  (nodeIndex, volumeIndex) => (value, allValues) => {
    const volumes = getDataVolumes(nodeIndex, allValues);
    if (volumeIndex >= volumes.length) {
      return;
    }
    if (!isFeatureVisible('rancher.volume_mount_point')) {
      return;
    }
    const volume = volumes[volumeIndex];
    const minSize = getMinSize(volume.mount_point);
    if (value < minSize) {
      return translate('Data volume should have at least {size} GB.', {
        size: minSize,
      });
    }
  };

export const VolumeSizeGroup: FunctionComponent<any> = (props) => {
  const validateVolumeSize = useMemo(
    () => [
      required,
      createVolumeSizeValidator(props.nodeIndex, props.volumeIndex),
    ],
    [props.nodeIndex, props.volumeIndex],
  );

  return (
    <FormGroup label={translate('Volume size')} required={true}>
      <Field
        name="size"
        units={translate('GB')}
        component={IntegerUnitField}
        parse={parseIntField}
        format={formatIntField}
        validate={validateVolumeSize}
      />
    </FormGroup>
  );
};
