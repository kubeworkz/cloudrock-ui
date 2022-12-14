import { FunctionComponent } from 'react';

import { ResetFormButton } from '@cloudrock/form/ResetFormButton';
import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import { MARKETPLACE_FILTER_FORM } from '../store/constants';

import { AttributeFilterListContainer } from './AttributeFilterListContainer';

const PureAttributeFilterListDialog: FunctionComponent<TranslateProps> = (
  props,
) => (
  <ModalDialog
    title={props.translate('Attributes filter')}
    footer={[
      <CloseDialogButton
        key={1}
        label={props.translate('Apply')}
        className="btn btn-primary"
      />,
      <ResetFormButton key={2} formName={MARKETPLACE_FILTER_FORM} />,
      <CloseDialogButton key={3} />,
    ]}
  >
    <AttributeFilterListContainer />
  </ModalDialog>
);

export const AttributeFilterListDialog = withTranslation(
  PureAttributeFilterListDialog,
);
