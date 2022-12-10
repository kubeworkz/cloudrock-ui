import { translate } from '@cloudrock/i18n';
import { detachVolume } from '@cloudrock/openstack/api';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateRuntimeState,
  validateState,
} from '@cloudrock/resource/actions/base';

import { isBootable } from './utils';

const validators = [
  isBootable,
  validateRuntimeState('in-use'),
  validateState('OK'),
];

export const DetachAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Detach')}
    apiMethod={detachVolume}
    resource={resource}
    validators={validators}
  />
);
