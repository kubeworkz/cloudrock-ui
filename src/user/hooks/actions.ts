import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const HookDetailsDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "HookDetailsDialog" */ './HookDetailsDialog'),
  'HookDetailsDialog',
);
const HookRemoveDialog = lazyComponent(
  () => import(/* webpackChunkName: "HookRemoveDialog" */ './HookRemoveDialog'),
  'HookRemoveDialog',
);

export const showHookRemoveConfirmation = (action: () => void) =>
  openModalDialog(HookRemoveDialog, { resolve: { action }, size: 'md' });

export const showHookUpdateDialog = (row?) =>
  openModalDialog(HookDetailsDialog, { resolve: { hook: row }, size: 'md' });
