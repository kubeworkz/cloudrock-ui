import { FunctionComponent } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { UpdateOfferingPermissionExpirationTimeButton } from '@cloudrock/customer/team/UpdateOfferingPermissionExpirationTimeButton';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { getCustomer, isOwnerOrStaff } from '@cloudrock/workspace/selectors';

import { OFFERING_PERMISSIONS_LIST_ID } from './constants';
import { OfferingPermissionCreateButton } from './OfferingPermissionCreateButton';
import { OfferingPermissionRemoveButton } from './OfferingPermissionRemoveButton';

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  return (
    <Table
      {...props}
      columns={[
        {
          title: translate('Offering'),
          render: ({ row }) => row.offering_name,
        },
        {
          title: translate('User'),
          render: ({ row }) => row.user_full_name,
        },
        {
          title: translate('Created at'),
          render: ({ row }) => formatDateTime(row.created),
        },
        {
          title: translate('Expires at'),
          render: ({ row }) =>
            row.expiration_time ? formatDateTime(row.expiration_time) : 'N/A',
        },
        {
          title: translate('Actions'),
          render: ({ row }) =>
            props.isOwnerOrStaff ? (
              <ButtonGroup>
                <OfferingPermissionRemoveButton permission={row} />
                <UpdateOfferingPermissionExpirationTimeButton
                  permission={row}
                />
              </ButtonGroup>
            ) : null,
        },
      ]}
      verboseName={translate('offering permissions')}
      actions={props.isOwnerOrStaff ? <OfferingPermissionCreateButton /> : null}
    />
  );
};

const TableOptions = {
  table: OFFERING_PERMISSIONS_LIST_ID,
  fetchData: createFetcher('marketplace-offering-permissions'),
  mapPropsToFilter: (props) => ({
    customer_uuid: props.customer.uuid,
  }),
};

export const OfferingPermissionsList = connect((state: RootState) => ({
  customer: getCustomer(state),
  isOwnerOrStaff: isOwnerOrStaff(state),
}))(connectTable(TableOptions)(TableComponent));
