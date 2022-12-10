import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const IssueCreateDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "IssueCreateDialog" */ '@cloudrock/issues/create/IssueCreateDialog'
    ),
  'IssueCreateDialog',
);

export const openIssueCreateDialog = (resolve, formId?: string) =>
  openModalDialog(IssueCreateDialog, { resolve, formId });
