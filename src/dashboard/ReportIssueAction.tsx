import { ENV } from '@cloudrock/configs/default';
import { MessageDialog } from '@cloudrock/core/MessageDialog';
import { translate, formatJsxTemplate } from '@cloudrock/i18n';
import { openIssueCreateDialog } from '@cloudrock/issues/create/actions';
import { openModalDialog } from '@cloudrock/modal/actions';
import store from '@cloudrock/store/store';

interface ReportIssueActionProps {
  issue: any;
  hideProjectAndResourceFields?: boolean;
}

export const getIssueAction = (props: ReportIssueActionProps) => {
  return {
    title: translate('Report an issue'),
    onClick() {
      if (ENV.plugins.CLOUDROCK_SUPPORT) {
        store.dispatch(
          openIssueCreateDialog({
            issue: props.issue,
            hideProjectAndResourceFields: props.hideProjectAndResourceFields,
          }),
        );
      } else {
        store.dispatch(
          openModalDialog(MessageDialog, {
            resolve: {
              title: translate('Report an issue'),
              message: translate(
                'To report an issue, please send an email to {supportEmail}.',
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
  };
};
