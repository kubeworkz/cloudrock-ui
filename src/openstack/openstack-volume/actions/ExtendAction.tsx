import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const VolumeExtendDialog = lazyComponent(
  () => import(/* webpackChunkName: "VolumeExtendDialog" */ './ExtendDialog'),
  'VolumeExtendDialog',
);

import { isBootable } from './utils';

const validators = [isBootable, validateState('OK')];

export const ExtendAction = ({ resource }) => (
  <DialogActionItem
    modalComponent={VolumeExtendDialog}
    title={translate('Extend')}
    validators={validators}
    resource={resource}
  />
);
