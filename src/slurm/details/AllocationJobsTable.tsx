import { FunctionComponent, ComponentType } from 'react';

import { translate } from '@cloudrock/i18n';
import { ResourceName } from '@cloudrock/resource/ResourceName';
import { ResourceState } from '@cloudrock/resource/state/ResourceState';
import { Resource } from '@cloudrock/resource/types';
import { Table, connectTable, createFetcher } from '@cloudrock/table';

import { SubmitJobAction } from './SubmitJobAction';

interface AllocationJobsTableProps {
  resource: Resource;
}

export const TableComponent: FunctionComponent<any> = (props) => {
  const columns = [
    {
      title: translate('Name'),
      render: ({ row }) => <ResourceName resource={row} />,
    },
    {
      title: translate('User'),
      render: ({ row }) => row.user_name || 'N/A',
    },
    {
      title: translate('Backend ID'),
      render: ({ row }) => row.backend_id || 'N/A',
    },
    {
      title: translate('State'),
      render: ({ row }) => <ResourceState resource={row} />,
    },
  ];
  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('jobs')}
      actions={<SubmitJobAction resource={props.resource} />}
    />
  );
};

const mapPropsToFilter = ({ resource }: AllocationJobsTableProps) => ({
  allocation_uuid: resource.uuid,
});

const TableOptions = {
  table: 'AllocationJobsTable',
  fetchData: createFetcher('slurm-jobs'),
  mapPropsToFilter,
};

export const AllocationJobsTable = connectTable(TableOptions)(
  TableComponent,
) as ComponentType<AllocationJobsTableProps>;
