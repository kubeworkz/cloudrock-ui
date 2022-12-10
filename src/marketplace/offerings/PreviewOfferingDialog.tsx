import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { getFormComponent } from '@cloudrock/marketplace/common/registry';
import { FORM_ID } from '@cloudrock/marketplace/details/constants';
import { PureOfferingConfiguratorProps } from '@cloudrock/marketplace/details/OfferingConfigurator';
import { OfferingFormData } from '@cloudrock/marketplace/details/types';
import {
  Offering,
  OfferingConfigurationFormProps,
} from '@cloudrock/marketplace/types';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { RootState } from '@cloudrock/store/reducers';
import { getProject } from '@cloudrock/workspace/selectors';
import { Project } from '@cloudrock/workspace/types';

import { getDefaultLimits } from './utils';

interface PreviewOfferingOwnProps {
  resolve: {
    offering: Offering;
  };
}

interface PreviewOfferingDialogProps
  extends OfferingConfigurationFormProps,
    PreviewOfferingOwnProps {}

const PurePreviewOfferingDialog = (props: PreviewOfferingDialogProps) => {
  const FormComponent = getFormComponent(props.resolve.offering.type);
  return (
    <ModalDialog
      title={translate('Preview offering')}
      footer={<CloseDialogButton />}
    >
      <FormComponent
        {...props}
        offering={props.resolve.offering}
        previewMode={true}
      />
    </ModalDialog>
  );
};

const storeConnector = connect<
  { project: Project },
  {},
  PreviewOfferingOwnProps,
  RootState
>((state, ownProps) => ({
  project: getProject(state),
  initialValues: {
    limits: getDefaultLimits(ownProps.resolve.offering),
  },
}));

const formConnector = reduxForm<
  OfferingFormData,
  PureOfferingConfiguratorProps
>({ form: FORM_ID, touchOnChange: true });

const enhance = compose(storeConnector, formConnector);

export const PreviewOfferingDialog = enhance(PurePreviewOfferingDialog);
