import { FunctionComponent } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Gravatar from 'react-gravatar';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import { ENV } from '@cloudrock/configs/default';
import { PROJECT_ADMIN_ROLE } from '@cloudrock/core/constants';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { Table, connectTable } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';
import {
  getProject,
  getUser,
  isOwnerOrStaff as isOwnerOrStaffSelector,
  isStaff as isStaffSelector,
  getCustomer,
} from '@cloudrock/workspace/selectors';

import { AddUserButton } from './AddUserButton';
import { fetchProjectUsers, fetchProjectManagers } from './api';
import { UserDetailsButton } from './UserDetailsButton';
import { UserRemoveButton } from './UserRemoveButton';

const TableComponent: FunctionComponent<any> = (props) => {
  return (
    <Table
      {...props}
      columns={[
        {
          title: translate('Member'),
          render: ({ row }) => (
            <>
              <Gravatar email={row.email} size={25} />{' '}
              {row.full_name || row.username}
            </>
          ),
        },
        {
          title: translate('Email'),
          render: ({ row }) => row.email || 'N/A',
        },
        {
          title: translate('Role in project'),
          render: ({ row }) => translate(ENV.roles[row.role]) || 'N/A',
        },
        {
          title: translate('Actions'),
          render: ({ row }) => (
            <>
              <UserDetailsButton user={row} />
              {props.isOwnerOrStaff || props.isProjectManager ? (
                <UserRemoveButton
                  permission={row.permission}
                  isDisabled={
                    !props.isOwnerOrStaff &&
                    (!props.isProjectManager || row.role !== PROJECT_ADMIN_ROLE)
                  }
                  refreshList={props.fetch}
                />
              ) : null}
            </>
          ),
        },
      ]}
      actions={
        <ButtonGroup>
          {props.isStaff && <AddUserButton refreshList={props.fetch} />}
        </ButtonGroup>
      }
      verboseName={translate('Team members')}
    />
  );
};

const TableOptions: TableOptionsType = {
  table: 'project-users',
  fetchData: fetchProjectUsers,
  queryField: 'full_name',
  mapPropsToFilter: (props) =>
    props.project
      ? {
          project_uuid: props.project.uuid,
          o: 'concatenated_name',
        }
      : {},
};

const ProjectUsersListComponent = connectTable(TableOptions)(TableComponent);

export const ProjectUsersList: FunctionComponent = () => {
  const user = useSelector(getUser);
  const project = useSelector(getProject);
  const { loading, error, value } = useAsync(
    async () => await fetchProjectManagers(user, project),
    [user, project],
  );
  const isStaff = useSelector(isStaffSelector);
  const isOwnerOrStaff = useSelector(isOwnerOrStaffSelector);
  const customer = useSelector(getCustomer);
  const isProjectManager = value && value.length > 0;
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <>{translate('Unable to load data')}</>;
  }
  return (
    <ProjectUsersListComponent
      project={project}
      customer={customer}
      user={user}
      isProjectManager={isProjectManager}
      isOwnerOrStaff={isOwnerOrStaff}
      isStaff={isStaff}
    />
  );
};
