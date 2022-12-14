import { FunctionComponent } from 'react';
import Gravatar from 'react-gravatar';

import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
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
          title: translate('Civil number'),
          render: ({ row }) => row.civil_number || 'N/A',
        },
        {
          title: translate('Phone number'),
          render: ({ row }) => row.phone_number || 'N/A',
        },
        {
          title: translate('Preferred language'),
          feature: 'user.preferred_language',
          render: ({ row }) => row.preferred_language || 'N/A',
        },
        {
          title: translate('Competence'),
          feature: 'user.competence',
          render: ({ row }) => row.competence || 'N/A',
        },
        {
          title: translate('Job position'),
          render: ({ row }) => row.job_title || 'N/A',
        },
        {
          title: translate('Affiliations'),
          render: ({ row }) =>
            Array.isArray(row.affiliations) && row.affiliations.length > 0
              ? row.affiliations.join(', ')
              : 'N/A',
        },
      ]}
      verboseName={translate('users')}
    />
  );
};

const TableOptions: TableOptionsType = {
  table: 'customer-users',
  fetchData: createFetcher('users'),
  queryField: 'full_name',
  mapPropsToFilter: (props) => ({ customer_uuid: props.customer.uuid }),
};

export const CustomerUsersList = connectTable(TableOptions)(TableComponent);
