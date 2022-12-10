import { translate } from '@cloudrock/i18n';
import { router } from '@cloudrock/router';

import { CustomerActionsProps } from './types';
import { checkPermissions } from './utils';

export const getProjectAction = (props: CustomerActionsProps) => {
  if (!checkPermissions(props)) {
    return undefined;
  }
  return {
    title: translate('Add project'),
    onClick() {
      router.stateService.go('organization.createProject');
    },
  };
};
