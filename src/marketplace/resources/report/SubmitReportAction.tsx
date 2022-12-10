import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

import { validateStaffAction } from '../actions/utils';

const SubmitReportDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "SubmitReportDialog" */ './SubmitReportDialog'),
  'SubmitReportDialog',
);

const validators = [validateState('OK', 'Erred'), validateStaffAction];

export const SubmitReportAction: FC<any> = ({ resource, reInitResource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Submit report')}
    modalComponent={SubmitReportDialog}
    resource={resource}
    extraResolve={{ reInitResource }}
  />
);
