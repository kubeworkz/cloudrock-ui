import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';

export const getSupportPortalAction = () =>
  ENV.plugins.CLOUDROCK_CORE.SUPPORT_PORTAL_URL
    ? {
        title: translate('Open support portal'),
        onClick() {
          window.open(ENV.plugins.CLOUDROCK_CORE.SUPPORT_PORTAL_URL);
        },
      }
    : undefined;
