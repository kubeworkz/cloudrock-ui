import { FunctionComponent } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { Link } from '@cloudrock/core/Link';
import { INVOICES_TABLE } from '@cloudrock/invoices/constants';
import { getActiveFixedPricePaymentProfile } from '@cloudrock/invoices/details/utils';
import { MarkAsPaidButton } from '@cloudrock/invoices/list/MarkAsPaidButton';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { InvoicePayButton } from '../details/InvoicePayButton';

import { InvoicesFilter } from './InvoicesFilter';
import { SendNotificationButton } from './SendNotificationButton';

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  const columns = [
    {
      title: translate('Invoice number'),
      render: ({ row }) => (
        <Link
          state="billingDetails"
          params={{ uuid: props.customer.uuid, invoice_uuid: row.uuid }}
        >
          {row.number}
        </Link>
      ),
    },
    {
      title: translate('State'),
      render: ({ row }) => row.state,
    },
    {
      title: translate('Invoice date'),
      render: ({ row }) => row.invoice_date || 'N/A',
    },
    {
      title: translate('Due date'),
      render: ({ row }) => row.due_date || 'N/A',
    },
  ];
  const activeFixedPriceProfile = getActiveFixedPricePaymentProfile(
    props.customer.payment_profiles,
  );
  if (!activeFixedPriceProfile) {
    columns.push(
      {
        title: translate('Price'),
        render: ({ row }) => defaultCurrency(row.price),
      },
      {
        title: translate('Tax'),
        render: ({ row }) => defaultCurrency(row.tax),
      },
      {
        title: translate('Total'),
        render: ({ row }) => defaultCurrency(row.total),
      },
      {
        title: translate('Actions'),
        render: ({ row }) => (
          <ButtonGroup>
            <SendNotificationButton row={row} />
            <MarkAsPaidButton row={row} />
            <InvoicePayButton invoice={row} />
          </ButtonGroup>
        ),
      },
    );
  }
  return (
    <Table {...props} columns={columns} verboseName={translate('invoices')} />
  );
};

const mapPropsToFilter = (props) => ({
  ...props.stateFilter,
  customer: props.customer.url,
  field: [
    'uuid',
    'state',
    'due_date',
    'month',
    'year',
    'invoice_date',
    'number',
    'price',
    'tax',
    'total',
    'payment_url',
  ],
});

const TableOptions: TableOptionsType = {
  table: INVOICES_TABLE,
  fetchData: createFetcher('invoices'),
  mapPropsToFilter,
  queryField: 'number',
  mapPropsToTableId: (props) => [props.customer.uuid],
};

const mapsStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
  stateFilter: getFormValues('InvoicesFilter')(state),
});

const enhance = compose(connect(mapsStateToProps), connectTable(TableOptions));

const InvoicesListComponent = enhance(TableComponent);

export const InvoicesList: FunctionComponent = () => (
  <>
    <InvoicesFilter />
    <InvoicesListComponent />
  </>
);
