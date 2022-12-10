import React from 'react';

import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';

import { ResourceUsageFormProps } from './ResourceUsageForm';
import { enhance } from './ResourceUsageFormContainer';
import { UsageReportContext } from './types';

export const ResourceUsageSubmitButton = enhance(
  (props: ResourceUsageFormProps) => (
    <form onSubmit={props.handleSubmit(props.submitReport)}>
      <CloseDialogButton />
      <SubmitButton
        submitting={props.submitting}
        label={translate('Submit usage report')}
      />
    </form>
  ),
) as React.ComponentType<{ params: UsageReportContext }>;
