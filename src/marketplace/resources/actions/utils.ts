import { translate } from '@cloudrock/i18n/translate';
import { ActionContext } from '@cloudrock/resource/actions/types';

export const validateStaffAction = (ctx: ActionContext) => {
  if (ctx.user.is_staff) {
    return;
  }
  return translate(`Only staff users are allowed to perform this action.`);
};
