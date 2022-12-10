import { FunctionComponent } from 'react';

import { CUSTOMER_OWNER_ROLE } from '@cloudrock/core/constants';
import { ProjectLink } from '@cloudrock/project/ProjectLink';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { filterByUser } from '@cloudrock/workspace/selectors';

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  return (
    <Table
      {...props}
      columns={[
        {
          title: translate('Project name'),
          render: ProjectLink,
        },
        {
          title: translate('Organization'),
          render: ({ row }) => <>{row.customer_name}</>,
        },
        {
          title: translate('Role'),
          render: ({ row }) => <>{translate(row.role)}</>,
        },
      ]}
      verboseName={translate('projects')}
      enableExport={true}
    />
  );
};

const TableOptions = {
  table: 'projects',
  fetchData: createFetcher('project-permissions'),
  getDefaultFilter: filterByUser,
  exportFields: ['customer', 'is_owner'],
  exportRow: (row) => [row.customer_name, row.role === CUSTOMER_OWNER_ROLE],
};

export const ProjectPermissions = connectTable(TableOptions)(TableComponent);
