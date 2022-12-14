import { FunctionComponent } from 'react';

import { ResourceRowActions } from '@cloudrock/resource/actions/ResourceRowActions';
import { ResourceName } from '@cloudrock/resource/ResourceName';
import { ResourceState } from '@cloudrock/resource/state/ResourceState';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { BooleanField } from '@cloudrock/table/BooleanField';

import { CreateNetworkAction } from '../openstack-tenant/actions/CreateNetworkAction';

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
          title: translate('Subnets'),
          render: ({ row }) =>
            row.subnets
              .map((subnet) => `${subnet.name}: ${subnet.cidr}`)
              .join(', ') || 'N/A',
        },
        {
          title: translate('State'),
          render: ({ row }) => <ResourceState resource={row} />,
        },
        {
          title: translate('Is external'),
          render: ({ row }) => <BooleanField value={row.is_external} />,
        },
        {
          title: translate('Actions'),
          render: ({ row }) => <ResourceRowActions resource={row} />,
        },
      ]}
      verboseName={translate('networks')}
      actions={<CreateNetworkAction resource={props.resource} />}
    />
  );
};

const TableOptions = {
  table: 'openstack-networks',
  fetchData: createFetcher('openstack-networks'),
  mapPropsToFilter: (props) => ({
    tenant_uuid: props.resource.uuid,
  }),
};

export const TenantNetworksList = connectTable(TableOptions)(TableComponent);
