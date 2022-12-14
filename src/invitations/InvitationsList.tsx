import { FunctionComponent } from 'react';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { formatDate } from '@cloudrock/core/dateUtils';
import { InvitationExpandableRow } from '@cloudrock/invitations/InvitationExpandableRow';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { InvitationCancelButton } from './actions/InvitationCancelButton';
import { InvitationCreateButton } from './actions/InvitationCreateButton';
import { InvitationSendButton } from './actions/InvitationSendButton';
import { InvitationsFilter } from './InvitationsFilter';
import { RoleField } from './RoleField';

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  return (
    <Table
      {...props}
      columns={[
        {
          title: translate('Email'),
          render: ({ row }) => (
            <>
              <Gravatar email={row.email} size={25} /> {row.email}
            </>
          ),
          orderField: 'email',
        },
        {
          title: translate('Role'),
          render: ({ row }) => <RoleField invitation={row} />,
        },
        {
          title: translate('Status'),
          orderField: 'state',
          render: ({ row }) => row.state,
        },
        {
          title: translate('Created at'),
          orderField: 'created',
          render: ({ row }) => formatDate(row.created),
        },
        {
          title: translate('Expires at'),
          orderField: 'expires',
          render: ({ row }) => formatDate(row.expires),
        },
        {
          title: translate('Actions'),
          visible: props.showActions,
          render: ({ row }) => (
            <>
              <InvitationSendButton invitation={row} />
              <InvitationCancelButton
                invitation={row}
                refreshList={props.fetch}
              />
            </>
          ),
        },
      ]}
      verboseName={translate('team invitations')}
      actions={<InvitationCreateButton refreshList={props.fetch} />}
      hasQuery={true}
      expandableRow={InvitationExpandableRow}
    />
  );
};

const mapPropsToFilter = (props) => ({
  ...props.stateFilter,
  customer: props.customer.uuid,
});

const TableOptions: TableOptionsType = {
  table: 'user-invitations',
  fetchData: createFetcher('user-invitations'),
  mapPropsToFilter,
  queryField: 'email',
};

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
  stateFilter: getFormValues('InvitationsFilter')(state),
});

const enhance = compose(connect(mapStateToProps), connectTable(TableOptions));

const InvitationsListComponent = enhance(TableComponent);

export const InvitationsList: FunctionComponent = () => (
  <>
    <InvitationsFilter />
    <InvitationsListComponent />
  </>
);
