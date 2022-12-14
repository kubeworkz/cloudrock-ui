import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { Link } from '@cloudrock/core/Link';
import { withTranslation } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { DASH_ESCAPE_CODE } from '@cloudrock/table/constants';
import { getProject } from '@cloudrock/workspace/selectors';

export const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  useTitle(translate('My orders'));
  const columns = [
    {
      title: translate('Created at'),
      render: ({ row }) => (
        <Link
          state="marketplace-order-details"
          params={{ order_uuid: row.uuid }}
          label={formatDateTime(row.created)}
        />
      ),
      orderField: 'created',
    },
    {
      title: translate('Created by'),
      render: ({ row }) => row.created_by_full_name || row.created_by_username,
    },
    {
      title: translate('State'),
      render: ({ row }) => row.state,
      orderField: 'state',
    },
    {
      title: translate('Approved at'),
      render: ({ row }) =>
        row.approved_at ? formatDateTime(row.approved_at) : DASH_ESCAPE_CODE,
    },
    {
      title: translate('Approved by'),
      render: ({ row }) =>
        row.approved_by_full_name ||
        row.approved_by_username ||
        DASH_ESCAPE_CODE,
    },
    {
      title: translate('Cost'),
      render: ({ row }) => defaultCurrency(row.total_cost || 0),
      orderField: 'total_cost',
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('Orders')}
      hasQuery={true}
      showPageSizeSelector={true}
      initialSorting={{ field: 'created', mode: 'desc' }}
      enableExport={true}
    />
  );
};

const TableOptions = {
  table: 'ordersList',
  fetchData: createFetcher('marketplace-orders'),
  mapPropsToFilter: (props) =>
    props.project ? { project_uuid: props.project.uuid } : {},
  exportRow: (row) => [
    formatDateTime(row.created),
    row.created_by_full_name || row.created_by_username,
    row.state,
    row.approved_at ? formatDateTime(row.approved_at) : DASH_ESCAPE_CODE,
    row.row.approved_by_full_name ||
      row.approved_by_username ||
      DASH_ESCAPE_CODE,
    row.total_cost,
  ],
  exportFields: [
    'Created at',
    'Created by',
    'State',
    'Approved at',
    'Approved by',
    'Cost',
  ],
};

const mapStateToProps = (state: RootState) => ({
  project: getProject(state),
});

const enhance = compose(
  connect(mapStateToProps),
  connectTable(TableOptions),
  withTranslation,
);

export const OrdersList = enhance(TableComponent);
