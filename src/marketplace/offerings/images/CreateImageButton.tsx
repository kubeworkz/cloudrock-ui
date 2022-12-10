import { connect } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { Offering } from '@cloudrock/marketplace/types';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const CreateImageDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "CreateImageDialog" */ './CreateImageDialog'),
  'CreateImageDialog',
);

interface CreateImageButtonProps {
  offering: Offering;
  openDialog(): void;
}

const openImageDialog = (props: CreateImageButtonProps) => {
  return openModalDialog(CreateImageDialog, {
    resolve: props,
    size: 'lg',
  });
};

const PureCreateImageButton = (props: CreateImageButtonProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '16px',
      }}
    >
      <ActionButton
        title={translate('Add image')}
        icon="fa fa-plus"
        action={props.openDialog}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDialog: () => dispatch(openImageDialog(ownProps)),
});

export const CreateImageButton = connect(
  null,
  mapDispatchToProps,
)(PureCreateImageButton);
