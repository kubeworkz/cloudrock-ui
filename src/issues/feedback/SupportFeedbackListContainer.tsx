import { translate } from '@cloudrock/i18n';
import { SupportFeedbackList } from '@cloudrock/issues/feedback/SupportFeedbackList';
import { SupportFeedbackListFilter } from '@cloudrock/issues/feedback/SupportFeedbackListFilter';
import { useReportingBreadcrumbs } from '@cloudrock/issues/workspace/SupportWorkspace';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';

import { useSupport } from '../hooks';

export const SupportFeedbackListContainer = () => {
  useTitle(translate('Feedback'));
  useReportingBreadcrumbs();
  useSidebarKey('reporting');
  useSupport();
  return (
    <div className="ibox">
      <div className="ibox-content">
        <SupportFeedbackListFilter />
        <SupportFeedbackList />
      </div>
    </div>
  );
};
