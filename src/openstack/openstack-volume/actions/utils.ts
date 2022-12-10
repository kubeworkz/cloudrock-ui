import { translate } from '@cloudrock/i18n';
import { ActionContext } from '@cloudrock/resource/actions/types';
import { Volume } from '@cloudrock/resource/types';

export function isBootable(ctx: ActionContext<Volume>): string {
  if (ctx.resource.bootable) {
    return translate(`System volume couldn't be detached.`);
  }
}

export function hasBackendId(ctx: ActionContext<Volume>): string {
  if (!ctx.resource.backend_id) {
    return translate('Resource does not have backend ID.');
  }
}
