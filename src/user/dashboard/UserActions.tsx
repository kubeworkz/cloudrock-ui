import { FunctionComponent } from 'react';

import { ActionList } from '@cloudrock/dashboard/ActionList';
import { getIssueAction } from '@cloudrock/dashboard/ReportIssueAction';
import { getReportSecurityIncidentAction } from '@cloudrock/dashboard/ReportSecurityIncidentAction';
import { getFlowCreateAction } from '@cloudrock/marketplace-flows/getFlowCreateAction';
import { User } from '@cloudrock/workspace/types';

interface UserActionsProps {
  user: User;
}

export const UserActions: FunctionComponent<UserActionsProps> = ({ user }) => (
  <ActionList
    actions={[
      getIssueAction({
        issue: { user },
        hideProjectAndResourceFields: true,
      }),
      getReportSecurityIncidentAction(false, false),
      getFlowCreateAction(),
    ].filter((action) => action !== undefined)}
  />
);
