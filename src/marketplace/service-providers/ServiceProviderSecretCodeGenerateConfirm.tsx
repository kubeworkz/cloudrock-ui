import { connect } from 'react-redux';

import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { ServiceProvider } from '@cloudrock/marketplace/types';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { ActionButton } from '@cloudrock/table/ActionButton';

import * as actions from './store/actions';

interface ServiceProviderSecretCodeRegenerateAlertProps extends TranslateProps {
  generateServiceProviderSecretCode(): void;
  resolve: {
    serviceProvider: ServiceProvider;
  };
}

const ServiceProviderSecretCodeRegenerateAlert = withTranslation(
  (props: ServiceProviderSecretCodeRegenerateAlertProps) => (
    <ModalDialog
      title={props.translate('Alert')}
      footer={[
        <ActionButton
          key="2"
          className="btn btn-success"
          icon="fa fa-check"
          title={props.translate('Regenerate')}
          action={props.generateServiceProviderSecretCode}
        />,
        <CloseDialogButton key="1" className="btn btn-danger" />,
      ]}
    >
      {props.translate(
        'After secret API code has been regenerated, it will not be possible to submit usage with the old key.',
      )}
    </ModalDialog>
  ),
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  generateServiceProviderSecretCode: () =>
    dispatch(
      actions.secretCodeRegenerateStart(ownProps.resolve.serviceProvider),
    ),
});

export const ServiceProviderSecretCodeGenerateConfirm = connect(
  null,
  mapDispatchToProps,
)(ServiceProviderSecretCodeRegenerateAlert);
