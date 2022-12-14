import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { OpenstackInstanceDataVolume } from '@cloudrock/openstack/openstack-instance/OpenstackInstanceDataVolume';

import { CreateResourceFormGroup } from '../CreateResourceFormGroup';

export const DataVolumeSizeGroup: FunctionComponent<any> = (props) => (
  <CreateResourceFormGroup>
    <Field
      name="attributes.data_volume_size"
      component={OpenstackInstanceDataVolume as any}
      min={1}
      max={1 * 10240}
      units="GB"
      isActive={props.isActive}
      setActive={props.setActive}
      format={(v) => (v ? v / 1024 : '')}
      normalize={(v) => Number(v) * 1024}
    />
  </CreateResourceFormGroup>
);
