import { FunctionComponent } from 'react';
import { ButtonGroup } from 'react-bootstrap';

import { CreateServerGroupAction } from '@cloudrock/openstack/openstack-tenant/actions/CreateServerGroupAction';
import { PullServerGroupsAction } from '@cloudrock/openstack/openstack-tenant/actions/PullServerGroupsAction';
import { ServerGroupType } from '@cloudrock/openstack/types';
import { ResourceRowActions } from '@cloudrock/resource/actions/ResourceRowActions';
import { ResourceName } from '@cloudrock/resource/ResourceName';
import { ResourceState } from '@cloudrock/resource/state/ResourceState';
import { Resource } from '@cloudrock/resource/types';
import { Table, connectTable, createFetcher } from '@cloudrock/table';

interface ResourceRules extends Resource {
  policy: ServerGroupType;
}

const ResourcePolicy = (resource: ResourceRules) => resource.policy;

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
          title: translate('Policy'),
          render: ({ row }) => ResourcePolicy(row),
          orderField: 'policy',
        },
        {
          title: translate('State'),
          render: ({ row }) => <ResourceState resource={row} />,
          className: 'col-sm-2',
        },
        {
          title: translate('Actions'),
          render: ({ row }) => <ResourceRowActions resource={row} />,
          className: 'col-sm-2',
        },
      ]}
      verboseName={translate('server groups')}
      initialSorting={{ field: 'name', mode: 'asc' }}
      showPageSizeSelector={true}
      actions={
        <ButtonGroup>
          <PullServerGroupsAction resource={props.resource} />
          <CreateServerGroupAction resource={props.resource} />
        </ButtonGroup>
      }
    />
  );
};

const TableOptions = {
  table: 'openstack-server-groups',
  fetchData: createFetcher('openstack-server-groups'),
  mapPropsToFilter: (props) => ({
    tenant_uuid: props.resource.uuid,
  }),
};

export const ServerGroupsList = connectTable(TableOptions)(TableComponent);
