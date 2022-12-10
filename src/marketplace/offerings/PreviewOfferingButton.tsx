import { connect } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getFormComponent } from '@cloudrock/marketplace/common/registry';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

import { Offering } from '../types';

const PreviewOfferingDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "PreviewOfferingDialog" */ './PreviewOfferingDialog'
    ),
  'PreviewOfferingDialog',
);

interface PreviewOfferingButtonProps {
  offering: Offering;
  openDialog(): void;
}

const openPreviewOfferingDialog = (props: PreviewOfferingButtonProps) => {
  return openModalDialog(PreviewOfferingDialog, {
    resolve: props,
    size: 'lg',
  });
};

const PurePreviewOfferingButton = (props: PreviewOfferingButtonProps) => {
  const FormComponent = getFormComponent(props.offering.type);
  if (!FormComponent) {
    return null;
  }
  return (
    <ActionButton
      title={translate('Preview')}
      icon="fa fa-eye"
      action={props.openDialog}
    />
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDialog: () => dispatch(openPreviewOfferingDialog(ownProps)),
});

export const PreviewOfferingButton = connect(
  null,
  mapDispatchToProps,
)(PurePreviewOfferingButton);
