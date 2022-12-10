import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { PAYMENTS_TABLE } from '@cloudrock/customer/details/constants';
import { PaymentInvoiceRenderer } from '@cloudrock/customer/payments/PaymentInvoiceRenderer';
import { PaymentProofRenderer } from '@cloudrock/customer/payments/PaymentProofRenderer';
import { translate } from '@cloudrock/i18n';
import { getActivePaymentProfile } from '@cloudrock/invoices/details/utils';
import { openModalDialog } from '@cloudrock/modal/actions';
import { RootState } from '@cloudrock/store/reducers';
import { connectTable, createFetcher, Table } from '@cloudrock/table';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { getCustomer, isStaff, isSupport } from '@cloudrock/workspace/selectors';

import { PaymentActions } from './PaymentActions';

const PaymentCreateDialogContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "PaymentCreateDialog" */ '@cloudrock/customer/payments/PaymentCreateDialog'
    ),
  'PaymentCreateDialogContainer',
);

const openPaymentCreateDialog = (profileUrl: string) =>
  openModalDialog(PaymentCreateDialogContainer, {
    resolve: {
      profileUrl: profileUrl,
    },
    size: 'lg',
  });

export const TableComponent: FunctionComponent<any> = (props) => {
  const activePaymentProfile = getActivePaymentProfile(
    props.customer.payment_profiles,
  );

  if (!activePaymentProfile) {
    return (
      <p>
        {translate(
          'Please, create and enable a payment profile to be able to manage payments.',
        )}
      </p>
    );
  }

  const tooltipAndDisabledAttributes = {
    disabled: props.isSupport && !props.isStaff,
    tooltip:
      props.isSupport && !props.isStaff
        ? translate('You must be staff to modify payments')
        : null,
  };

  const columns = [
    {
      title: translate('Date'),
      render: ({ row }) => formatDateTime(row.date_of_payment),
    },
    {
      title: translate('Sum'),
      render: ({ row }) => row.sum,
    },
    {
      title: translate('Proof'),
      render: PaymentProofRenderer,
    },
    {
      title: translate('Invoice'),
      render: PaymentInvoiceRenderer,
    },
    {
      title: translate('Actions'),
      render: ({ row }) => (
        <PaymentActions
          payment={row}
          tooltipAndDisabledAttributes={tooltipAndDisabledAttributes}
        />
      ),
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('payments')}
      showPageSizeSelector={true}
      actions={
        <ActionButton
          title={translate('Add payment')}
          action={() => props.openCreateDialog(activePaymentProfile.url)}
          icon="fa fa-plus"
          {...tooltipAndDisabledAttributes}
        />
      }
    />
  );
};

const TableOptions = {
  table: PAYMENTS_TABLE,
  fetchData: createFetcher('payments'),
  mapPropsToFilter: (props) => ({
    profile_uuid: getActivePaymentProfile(props.customer.payment_profiles).uuid,
  }),
};

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
  isStaff: isStaff(state),
  isSupport: isSupport(state),
});

const mapDispatchToProps = (dispatch) => ({
  openCreateDialog: (profileUrl: string) =>
    dispatch(openPaymentCreateDialog(profileUrl)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  connectTable(TableOptions),
);

export const PaymentsList = enhance(TableComponent);
