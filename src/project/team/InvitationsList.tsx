import { FunctionComponent } from 'react';
import Gravatar from 'react-gravatar';
import { connect, useSelector } from 'react-redux';
import { useAsync } from 'react-use';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { formatDate } from '@cloudrock/core/dateUtils';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { InvitationCancelButton } from '@cloudrock/invitations/actions/InvitationCancelButton';
import { InvitationCreateButton } from '@cloudrock/invitations/actions/InvitationCreateButton';
import { InvitationSendButton } from '@cloudrock/invitations/actions/InvitationSendButton';
import { InvitationExpandableRow } from '@cloudrock/invitations/InvitationExpandableRow';
import { InvitationsFilter } from '@cloudrock/invitations/InvitationsFilter';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';
import {
  getProject,
  getUser,
  isOwnerOrStaff as isOwnerOrStaffSelector,
} from '@cloudrock/workspace/selectors';

import { fetchProjectManagers } from './api';
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
          visible: props.canManage,
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
      verboseName={translate('Team invitations')}
      actions={
        props.canManage ? (
          <InvitationCreateButton
            project={props.project}
            refreshList={props.fetch}
          />
        ) : null
      }
      hasQuery={true}
      expandableRow={InvitationExpandableRow}
    />
  );
};

const mapPropsToFilter = (props) => ({
  ...props.stateFilter,
  project: props.project.uuid,
});

const TableOptions: TableOptionsType = {
  table: 'user-invitations',
  fetchData: createFetcher('user-invitations'),
  mapPropsToFilter,
  queryField: 'email',
};

const mapStateToProps = (state: RootState) => ({
  project: getProject(state),
  stateFilter: getFormValues('InvitationsFilter')(state),
});

const enhance = compose(connect(mapStateToProps), connectTable(TableOptions));

const InvitationsListComponent = enhance(
  TableComponent,
) as React.ComponentType<any>;

export const InvitationsList: FunctionComponent = () => {
  const user = useSelector(getUser);
  const project = useSelector(getProject);
  const { loading, error, value } = useAsync(
    async () => await fetchProjectManagers(user, project),
    [user, project],
  );
  const isOwnerOrStaff = useSelector(isOwnerOrStaffSelector);
  const isProjectManager = value && value.length > 0;

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <>{translate('Unable to load data')}</>;
  }
  return (
    <>
      <InvitationsFilter />
      <InvitationsListComponent
        canManage={isProjectManager || isOwnerOrStaff}
        project={project}
      />
    </>
  );
};
