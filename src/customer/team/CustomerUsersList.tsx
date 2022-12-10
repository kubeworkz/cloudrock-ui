import { FunctionComponent } from 'react';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { CUSTOMER_USERS_LIST_FILTER_FORM_ID } from '@cloudrock/customer/team/constants';
import { CustomerUsersListExpandableRow } from '@cloudrock/customer/team/CustomerUsersListExpandableRow';
import { translate } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';
import { CustomerRole } from '@cloudrock/user/dashboard/CustomerRole';
import {
  getProject,
  isStaff as isStaffSelector,
  getCustomer,
} from '@cloudrock/workspace/selectors';

import { fetchCustomerUsers } from './api';
import { CustomerUserAddButton } from './CustomerUserAddButton';
import { CustomerUserRowActions } from './CustomerUserRowActions';

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
          title: translate('Owner'),
          render: CustomerRole,
        },
        {
          title: translate('Actions'),
          render: ({ row }) => (
            <CustomerUserRowActions row={row} refreshList={props.fetch} />
          ),
        },
      ]}
      verboseName={translate('team members')}
      hasQuery={true}
      expandableRow={CustomerUsersListExpandableRow}
      actions={
        props.isStaff ? (
          <CustomerUserAddButton refreshList={props.fetch} />
        ) : null
      }
    />
  );
};

const mapPropsToFilter = (props) => {
  const filter: Record<string, string | boolean> = {
    customer_uuid: props.customer.uuid,
    o: 'concatenated_name',
  };
  if (props.filter) {
    if (props.filter.project_role) {
      filter.project_role = props.filter.project_role.map(({ value }) => value);
    }
    if (props.filter.organization_role) {
      filter.organization_role = props.filter.organization_role.map(
        ({ value }) => value,
      );
    }
  }
  return filter;
};

const TableOptions: TableOptionsType = {
  table: 'customer-users',
  fetchData: fetchCustomerUsers,
  queryField: 'full_name',
  mapPropsToFilter,
};

const mapStateToProps = (state: RootState) => ({
  project: getProject(state),
  isStaff: isStaffSelector(state),
  customer: getCustomer(state),
  filter: getFormValues(CUSTOMER_USERS_LIST_FILTER_FORM_ID)(state),
});

const enhance = compose(connect(mapStateToProps), connectTable(TableOptions));

export const CustomerUsersList = enhance(TableComponent);
