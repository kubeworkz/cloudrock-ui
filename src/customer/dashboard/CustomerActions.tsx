import { FunctionComponent } from 'react';

import { ActionList } from '@cloudrock/dashboard/ActionList';
import { getIssueAction } from '@cloudrock/dashboard/ReportIssueAction';
import { getReportSecurityIncidentAction } from '@cloudrock/dashboard/ReportSecurityIncidentAction';
import { getSupportPortalAction } from '@cloudrock/dashboard/SupportPortalAction';

import { getProjectAction } from './CreateProjectAction';
import { getInviteAction } from './InviteUserAction';
import { CustomerActionsProps } from './types';

export const CustomerActions: FunctionComponent<CustomerActionsProps> = (
  props,
) => (
  <ActionList
    actions={[
      getProjectAction(props),
      getInviteAction(props),
      getIssueAction({
        issue: { customer: props.customer },
      }),
      getSupportPortalAction(),
      getReportSecurityIncidentAction(),
    ].filter((action) => action !== undefined)}
  />
);
