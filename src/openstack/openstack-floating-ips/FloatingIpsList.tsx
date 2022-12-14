import { FunctionComponent } from 'react';
import { ButtonGroup } from 'react-bootstrap';

import { Link } from '@cloudrock/core/Link';
import { ResourceRowActions } from '@cloudrock/resource/actions/ResourceRowActions';
import { ResourceName } from '@cloudrock/resource/ResourceName';
import { ResourceState } from '@cloudrock/resource/state/ResourceState';
import { Table, connectTable, createFetcher } from '@cloudrock/table';

import { CreateFloatingIpAction } from '../openstack-tenant/actions/CreateFloatingIpAction';
import { PullFloatingIpsAction } from '../openstack-tenant/actions/PullFloatingIpsAction';

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  return (
    <Table
      {...props}
      columns={[
        {
          title: translate('Floating IP'),
          render: ({ row }) => <ResourceName resource={row} />,
        },
        {
          title: translate('State'),
          render: ({ row }) => <ResourceState resource={row} />,
        },
        {
          title: translate('Instance'),
          render: ({ row }) => {
            if (!row.instance_uuid) {
              return translate('Not assigned');
            }
            return (
              <Link
                state="resource-details"
                params={{
                  uuid: row.project_uuid,
                  resource_uuid: row.instance_uuid,
                  resource_type: 'OpenStackTenant.Instance',
                }}
                label={row.instance_name}
              />
            );
          },
        },
        {
          title: translate('Actions'),
          render: ({ row }) => <ResourceRowActions resource={row} />,
        },
      ]}
      verboseName={translate('floating IPs')}
      actions={
        <ButtonGroup>
          <PullFloatingIpsAction resource={props.resource} />
          <CreateFloatingIpAction resource={props.resource} />
        </ButtonGroup>
      }
    />
  );
};

const TableOptions = {
  table: 'openstack-floating-ips',
  fetchData: createFetcher('openstack-floating-ips'),
  mapPropsToFilter: (props) => ({
    tenant_uuid: props.resource.uuid,
  }),
};

export const FloatingIpsList = connectTable(TableOptions)(TableComponent);
