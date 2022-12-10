import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const KeyRemoveDialog = lazyComponent(
  () => import(/* webpackChunkName: "KeyRemoveDialog" */ './KeyRemoveDialog'),
  'KeyRemoveDialog',
);

export const showKeyRemoveConfirmation = (action: () => void) =>
  openModalDialog(KeyRemoveDialog, { resolve: { action }, size: 'md' });
