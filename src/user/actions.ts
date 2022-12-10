import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const UserPopover = lazyComponent(
  () =>
    import(/* webpackChunkName: "UserPopover" */ '@cloudrock/user/UserPopover'),
  'UserPopover',
);

export const openUserPopover = (resolve) =>
  openModalDialog(UserPopover, { resolve });
