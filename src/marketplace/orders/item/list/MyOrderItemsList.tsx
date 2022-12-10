import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';
import { connectTable, createFetcher, Table } from '@cloudrock/table';
import { renderFieldOrDash } from '@cloudrock/table/utils';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { TABLE_MY_ORDERS } from './constants';
import { OrderItemslistTablePlaceholder } from './OrderItemsListPlaceholder';
import { OrderItemStateCell } from './OrderItemStateCell';
import { OrderItemTypeCell } from './OrderItemTypeCell';
import { ResourceNameField } from './ResourceNameField';
import { RowNameField } from './RowNameField';
import { ShowRequestButton } from './ShowRequestButton';

const TableComponent: FunctionComponent<any> = (props) => {
  const columns = [
    {
      title: translate('Offering'),
      render: RowNameField,
    },
    {
      title: translate('Resource'),
      render: ResourceNameField,
    },
    {
      title: translate('Project'),
      render: ({ row }) => row.project_name,
    },
    {
      title: translate('Created at'),
      render: ({ row }) => formatDateTime(row.created),
    },
    {
      title: translate('Type'),
      render: OrderItemTypeCell,
    },
    {
      title: translate('State'),
      render: OrderItemStateCell,
    },
    {
      title: translate('Plan'),
      render: ({ row }) => renderFieldOrDash(row.plan_name),
    },
    {
      title: translate('Actions'),
      render: ShowRequestButton,
    },
  ];

  return (
    <Table
      {...props}
      placeholderComponent={<OrderItemslistTablePlaceholder />}
      columns={columns}
      initialSorting={{ field: 'created', mode: 'desc' }}
      showPageSizeSelector={true}
      verboseName={translate('Order items')}
      enableExport={true}
    />
  );
};

const mapPropsToFilter = (props) => {
  const filter: Record<string, string> = { o: '-created' };
  if (props.customer) {
    filter.customer_uuid = props.customer.uuid;
  }
  if (props.filter) {
    if (props.filter.state) {
      filter.state = props.filter.state.value;
    }
    if (props.filter.type) {
      filter.type = props.filter.type.value;
    }
    if (props.filter.project) {
      filter.project_uuid = props.filter.project.uuid;
    }
  }
  return filter;
};

const exportRow = (row) => [
  row.offering_name,
  row.project_name,
  formatDateTime(row.created),
  row.type,
  row.state,
  renderFieldOrDash(row.plan_name),
];

const exportFields = [
  'Offering',
  'Project',
  'Created at',
  'Type',
  'State',
  'Plan',
  'Cost',
];

const TableOptions = {
  table: TABLE_MY_ORDERS,
  fetchData: createFetcher('marketplace-order-items'),
  mapPropsToFilter,
  exportRow,
  exportFields,
};

const mapStateToProps = (state: RootState) => ({
  filter: getFormValues('MyOrderItemsFilter')(state),
  customer: getCustomer(state),
});

const enhance = compose(connect(mapStateToProps), connectTable(TableOptions));

export const MyOrderItemsList = enhance(TableComponent);
