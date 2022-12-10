import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { customerCreateDialog } from '@cloudrock/customer/create/actions';
import { canCreateOrganization } from '@cloudrock/customer/create/selectors';
import { TranslateProps } from '@cloudrock/i18n';
import { withTranslation } from '@cloudrock/i18n/translate';
import { RootState } from '@cloudrock/store/reducers';
import { ActionButton } from '@cloudrock/table/ActionButton';

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

type CustomerCreateButtonProps = StateProps & DispatchProps & TranslateProps;

const CustomerCreateButton: FunctionComponent<CustomerCreateButtonProps> = ({
  isVisible,
  onClick,
  translate,
}) =>
  isVisible ? (
    <ActionButton
      title={translate('Add organization')}
      action={onClick}
      icon="fa fa-plus"
    />
  ) : null;

const mapDispatchToProps = {
  onClick: customerCreateDialog,
};

const mapStateToProps = (state: RootState) => ({
  isVisible: canCreateOrganization(state),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation,
);

export default enhance(CustomerCreateButton);
