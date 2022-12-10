import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

interface PlanDescriptionProps extends TranslateProps {
  resolve: {
    plan_description: string;
  };
}

export const PlanDescription = withTranslation(
  (props: PlanDescriptionProps) => (
    <ModalDialog
      title={props.translate('Plan description')}
      footer={<CloseDialogButton />}
    >
      <FormattedHtml html={props.resolve.plan_description} />
    </ModalDialog>
  ),
);
