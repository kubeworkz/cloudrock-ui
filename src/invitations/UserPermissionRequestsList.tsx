import { connect } from 'react-redux';
import { compose } from 'redux';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import { USER_PERMISSION_REQUESTS_TABLE_ID } from '@cloudrock/invitations/constants';
import { PermissionRequestStateField } from '@cloudrock/invitations/PermissionRequestStateField';
import { UserPermissionRequestRowActions } from '@cloudrock/invitations/UserPermissionRequestRowActions';
import { connectTable, createFetcher, Table } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';

interface OwnProps {
  groupInvitationUuid: string;
}

const TableComponent = (props: any) => {
  const columns = [
    {
      title: translate('Created by'),
      render: ({ row }) => row.created_by_full_name,
    },
    {
      title: translate('Created at'),
      render: ({ row }) => formatDateTime(row.created),
    },
    {
      title: translate('Reviewed at'),
      render: ({ row }) =>
        row.reviewed_at ? formatDateTime(row.reviewed_at) : 'N/A',
    },
    {
      title: translate('Comment'),
      render: ({ row }) => row.review_comment,
    },
    {
      title: translate('State'),
      render: PermissionRequestStateField,
    },
    {
      title: translate('Actions'),
      render: ({ row }) => (
        <UserPermissionRequestRowActions row={row} refreshList={props.fetch} />
      ),
    },
  ];
  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('user permission requests')}
      showPageSizeSelector={true}
    />
  );
};

const TableOptions: TableOptionsType = {
  table: USER_PERMISSION_REQUESTS_TABLE_ID,
  fetchData: createFetcher('user-permission-requests'),
  mapPropsToFilter: (props: OwnProps) => ({
    invitation: props.groupInvitationUuid,
  }),
  mapPropsToTableId: (props: OwnProps) => [props.groupInvitationUuid],
};

const enhance = compose(
  connect<{}, {}, OwnProps>(null),
  connectTable(TableOptions),
);

export const UserPermissionRequestsList = enhance(TableComponent);
