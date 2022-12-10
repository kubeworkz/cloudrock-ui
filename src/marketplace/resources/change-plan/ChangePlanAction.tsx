import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';
import { Resource } from '@cloudrock/resource/types';

const ChangePlanDialog = lazyComponent(
  () => import(/* webpackChunkName: "ChangePlanDialog" */ './ChangePlanDialog'),
  'ChangePlanDialog',
);

const validators = [validateState('OK')];

export const ChangePlanAction: FC<{ resource: Resource }> = ({ resource }) =>
  resource.marketplace_resource_uuid !== null ? (
    <DialogActionItem
      validators={validators}
      title={translate('Change plan')}
      dialogSize="lg"
      modalComponent={ChangePlanDialog}
      resource={resource}
    />
  ) : null;
