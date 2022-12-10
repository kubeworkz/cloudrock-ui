import React from 'react';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { withTranslation } from '@cloudrock/i18n';
import {
  Field,
  ResourceSummaryProps,
  PureResourceSummaryBase,
} from '@cloudrock/resource/summary';
import { Schedule } from '@cloudrock/resource/types';
import { formatRetentionTime, formatSchedule } from '@cloudrock/resource/utils';

export const PureScheduleSummary: React.FC<ResourceSummaryProps<Schedule>> = (
  props,
) => {
  const { translate, resource } = props;
  return (
    <>
      <PureResourceSummaryBase {...props} />
      <Field label={translate('Schedule')} value={formatSchedule(props)} />
      <Field label={translate('Time zone')} value={resource.timezone} />
      <Field
        label={translate('Is active')}
        value={resource.is_active ? translate('Yes') : translate('No')}
      />
      <Field
        label={translate('Retention time')}
        value={formatRetentionTime(props)}
      />
      <Field
        label={translate('Next trigger at')}
        value={formatDateTime(resource.next_trigger_at)}
      />
    </>
  );
};

export const ScheduleSummary = withTranslation(PureScheduleSummary);
