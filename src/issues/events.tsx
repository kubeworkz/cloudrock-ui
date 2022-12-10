import { UISref } from '@uirouter/react';

import eventsRegistry from '@cloudrock/events/registry';
import { getCallerContext } from '@cloudrock/events/utils';
import { gettext } from '@cloudrock/i18n';

const getIssueContext = (event) => ({
  ...getCallerContext(event),
  issue_link: (
    <UISref to="support.detail" params={{ uuid: event.issue_uuid }}>
      <a>{event.issue_key}</a>
    </UISref>
  ),
});

eventsRegistry.registerGroup({
  title: gettext('Support request events'),
  context: getIssueContext,
  events: [
    {
      key: 'issue_creation_succeeded',
      title: gettext('Issue {issue_link} has been created by {caller_link}.'),
    },
  ],
});
