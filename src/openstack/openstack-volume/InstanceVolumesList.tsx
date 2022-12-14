import { FunctionComponent } from 'react';

import { formatFilesize } from '@cloudrock/core/utils';
import { ResourceRowActions } from '@cloudrock/resource/actions/ResourceRowActions';
import { ResourceName } from '@cloudrock/resource/ResourceName';
import { ResourceState } from '@cloudrock/resource/state/ResourceState';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { BooleanField } from '@cloudrock/table/BooleanField';

import { AttachVolumeAction } from '../openstack-instance/actions/AttachVolumeAction';

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  return (
    <Table
      {...props}
      columns={[
        {
          title: translate('Name'),
          render: ({ row }) => <ResourceName resource={row} />,
        },
        {
          title: translate('Size'),
          render: ({ row }) => formatFilesize(row.size),
        },
        {
          title: translate('Bootable'),
          render: ({ row }) => <BooleanField value={row.bootable} />,
        },
        {
          title: translate('Type'),
          render: ({ row }) => row.type_name || 'N/A',
        },
        {
          title: translate('Attached to'),
          render: ({ row }) => row.device || 'N/A',
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
      actions={<AttachVolumeAction resource={props.resource} />}
      verboseName={translate('volumes')}
    />
  );
};

const TableOptions = {
  table: 'openstacktenant-volumes',
  fetchData: createFetcher('openstacktenant-volumes'),
  mapPropsToFilter: (props) => ({
    instance_uuid: props.resource.uuid,
  }),
};

export const InstanceVolumesList = connectTable(TableOptions)(TableComponent);
