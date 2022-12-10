import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';
import { UserOfferingListPlaceholder } from '@cloudrock/user/UserOfferingListPlaceholder';
import { getUser } from '@cloudrock/workspace/selectors';
import { UserDetails } from '@cloudrock/workspace/types';

interface OwnProps {
  user?: UserDetails;
}

export const TableComponent: FunctionComponent<any> = (props) => {
  const columns = [
    {
      title: translate('Offering'),
      render: ({ row }) => <>{row.offering_name}</>,
    },
    {
      title: translate('Username'),
      render: ({ row }) => <>{row.username || 'N/A'}</>,
    },
    {
      title: translate('Created at'),
      render: ({ row }) => formatDateTime(row.created),
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('remote accounts')}
      placeholderComponent={<UserOfferingListPlaceholder />}
      showPageSizeSelector={true}
    />
  );
};

export const TableOptions: TableOptionsType = {
  table: 'UserOfferingList',
  fetchData: createFetcher('marketplace-offering-users'),
  mapPropsToFilter: (props) => ({
    user_uuid: props.user?.uuid,
  }),
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  user: ownProps.user || getUser(state),
});

const enhance = compose(connect(mapStateToProps), connectTable(TableOptions));

export const UserOfferingList = enhance(TableComponent);
