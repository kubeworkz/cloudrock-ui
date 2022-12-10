import { FunctionComponent } from 'react';

import { CustomerLink } from '@cloudrock/customer/CustomerLink';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { filterByUser } from '@cloudrock/workspace/selectors';

import CustomerCreateButton from './CustomerCreateButton';
import { CustomerRole } from './CustomerRole';

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate, filterColumns } = props;
  return (
    <Table
      {...props}
      columns={filterColumns([
        {
          title: translate('Organization name'),
          render: CustomerLink,
        },
        {
          title: translate('Owner'),
          render: CustomerRole,
          className: 'text-center col-md-1',
        },
      ])}
      verboseName={translate('organizations')}
      actions={<CustomerCreateButton />}
      enableExport={true}
    />
  );
};

const TableOptions = {
  table: 'customers',
  fetchData: createFetcher('customer-permissions'),
  getDefaultFilter: filterByUser,
  exportFields: ['customer', 'role'],
  exportRow: (row) => [row.customer_name, row.role],
};

export const CustomerPermissions = connectTable(TableOptions)(TableComponent);
