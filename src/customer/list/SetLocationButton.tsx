import { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { setOrganizationLocation } from '@cloudrock/customer/list/store/actions';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { Customer } from '@cloudrock/workspace/types';

const SetLocationDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SetLocationDialog" */ '@cloudrock/map/SetLocationDialog'
    ),
  'SetLocationDialog',
);

interface SetLocationButtonProps {
  customer: Customer;
  openDialog(): void;
  dispatch: any;
}

const openSetLocationDialog = (
  dispatch,
  { customer }: SetLocationButtonProps,
) =>
  openModalDialog(SetLocationDialog, {
    resolve: {
      data: customer,
      setLocationFn: (data) => dispatch(setOrganizationLocation(data)),
      label: translate('Location of {name} organization', {
        name: customer.name,
      }),
    },
    size: 'lg',
  });

const PureSetLocationButton: FunctionComponent<SetLocationButtonProps> = (
  props,
) => (
  <ActionButton
    title={translate('Set location')}
    icon="fa fa-map-marker"
    action={props.openDialog}
  />
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDialog: () => dispatch(openSetLocationDialog(dispatch, ownProps)),
});

export const SetLocationButton = connect(
  null,
  mapDispatchToProps,
)(PureSetLocationButton);
