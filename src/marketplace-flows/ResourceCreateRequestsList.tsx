import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { approveResource, rejectResource } from './api';
import { ResourceCreateExpandableRow } from './ResourceCreateExpandableRow';
import { ReviewActions } from './ReviewActions';
import { getColumns } from './utils';

export const TableComponent: FunctionComponent<any> = (props) => {
  useTitle(translate('Resource creation requests'));
  const columns = [
    ...getColumns(),
    {
      title: translate('Actions'),
      render: ({ row }) => (
        <ReviewActions
          request={row}
          refreshList={props.fetch}
          approveMethod={approveResource}
          rejectMethod={rejectResource}
        />
      ),
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('requests')}
      showPageSizeSelector={true}
      expandableRow={ResourceCreateExpandableRow}
    />
  );
};

export const TableOptions: TableOptionsType = {
  table: 'ResourceCreateRequestsList',
  fetchData: createFetcher('marketplace-resource-creation-requests'),
  mapPropsToFilter: (props) => ({
    service_provider_uuid: props.customer?.uuid,
  }),
};

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
});

const enhance = compose(connect(mapStateToProps), connectTable(TableOptions));

export const ResourceCreateRequestsList = enhance(TableComponent);
