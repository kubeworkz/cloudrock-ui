import { connect } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { Customer } from '@cloudrock/workspace/types';

const OrganizationDetailsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OrganizationDetailsDialog" */ '@cloudrock/customer/list/OrganizationDetailsDialog'
    ),
  'OrganizationDetailsDialog',
);

interface OrganizationDetailsButtonProps {
  customer: Customer;
  openDialog(): void;
}

const openOrganizationDetailsDialog = (props: OrganizationDetailsButtonProps) =>
  openModalDialog(OrganizationDetailsDialog, {
    resolve: props,
    size: 'lg',
  });

const PureOrganizationDetailsButton = (
  props: OrganizationDetailsButtonProps,
) => (
  <ActionButton
    title={translate('Details')}
    icon="fa fa-eye"
    action={props.openDialog}
  />
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDialog: () => dispatch(openOrganizationDetailsDialog(ownProps)),
});

export const OrganizationDetailsButton = connect(
  null,
  mapDispatchToProps,
)(PureOrganizationDetailsButton);
