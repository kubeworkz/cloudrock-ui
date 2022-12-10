import { ENV } from '@cloudrock/configs/default';
import { MessageDialog } from '@cloudrock/core/MessageDialog';
import { translate, formatJsxTemplate } from '@cloudrock/i18n';
import { openReportSecurityIncidentDialog } from '@cloudrock/issues/security-incident/store/actions';
import { openModalDialog } from '@cloudrock/modal/actions';
import store from '@cloudrock/store/store';

export const getReportSecurityIncidentAction = (
  showProjectField = true,
  showResourceField = true,
) => ({
  title: translate('Report a security incident'),
  onClick() {
    if (ENV.plugins.CLOUDROCK_SUPPORT) {
      store.dispatch(
        openReportSecurityIncidentDialog(showProjectField, showResourceField),
      );
    } else {
      store.dispatch(
        openModalDialog(MessageDialog, {
          resolve: {
            title: translate('Report a security incident'),
            message: translate(
              'To report a security incident, please send an email to {supportEmail}.',
              {
                supportEmail: (
                  <a href={`mailto:${ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL}`}>
                    {ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL}
                  </a>
                ),
              },
              formatJsxTemplate,
            ),
          },
        }),
      );
    }
  },
});
