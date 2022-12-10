import { FunctionComponent } from 'react';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { formatFilesize } from '@cloudrock/core/utils';
import { ResourceRowActions } from '@cloudrock/resource/actions/ResourceRowActions';
import { ResourceName } from '@cloudrock/resource/ResourceName';
import { ResourceState } from '@cloudrock/resource/state/ResourceState';
import { Table, connectTable, createFetcher } from '@cloudrock/table';

import { CreateDiskAction } from './actions/CreateDiskAction';

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  return (
    <Table
      {...props}
      columns={[
        {
          title: translate('Name'),
          render: ({ row }) => <ResourceName resource={row} />,
          orderField: 'name',
        },
        {
          title: translate('Size'),
          render: ({ row }) => formatFilesize(row.size),
        },
        {
          title: translate('Created'),
          render: ({ row }) => formatDateTime(row.created),
          orderField: 'created',
        },
        {
          title: translate('State'),
          render: ({ row }) => <ResourceState resource={row} />,
        },
        {
          title: translate('Actions'),
          render: ({ row }) => <ResourceRowActions resource={row} />,
        },
      ]}
      verboseName={translate('disks')}
      hasQuery={false}
      actions={<CreateDiskAction resource={props.resource} />}
    />
  );
};

const mapPropsToFilter = (props) => ({
  vm_uuid: props.resource.uuid,
});

const TableOptions = {
  table: 'vmware-disks',
  fetchData: createFetcher('vmware-disks'),
  mapPropsToFilter,
};

export const DisksList = connectTable(TableOptions)(TableComponent);
