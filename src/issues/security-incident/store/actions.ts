import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const ReportSecurityIncidentDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ReportSecurityIncidentDialog" */ '@cloudrock/issues/security-incident/ReportSecurityIncidentDialog'
    ),
  'ReportSecurityIncidentDialog',
);

export const openReportSecurityIncidentDialog = (
  showProjectField,
  showResourceField,
) =>
  openModalDialog(ReportSecurityIncidentDialog, {
    resolve: { showProjectField, showResourceField },
  });
