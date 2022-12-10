import { translate } from '@cloudrock/i18n';
import { useReportingBreadcrumbs } from '@cloudrock/issues/workspace/SupportWorkspace';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';
import { SupportEventsList } from '@cloudrock/support/SupportEventsList';
import { SupportEventsListFilter } from '@cloudrock/support/SupportEventsListFilter';

export const SupportEventsContainer = () => {
  useTitle(translate('Audit logs'));
  useReportingBreadcrumbs();
  useSidebarKey('reporting');
  return (
    <div className="ibox">
      <div className="ibox-content">
        <SupportEventsListFilter />
        <SupportEventsList />
      </div>
    </div>
  );
};
