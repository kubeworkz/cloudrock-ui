import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { translate } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';

import { approveCustomer, rejectCustomer } from './api';
import { CustomerCreateExpandableRow } from './CustomerCreateExpandableRow';
import { ReviewActions } from './ReviewActions';
import { flowFilterFormSelector, getColumns } from './utils';

export const TableComponent: FunctionComponent<any> = (props) => {
  const columns = [
    ...getColumns(),
    {
      title: translate('Actions'),
      render: ({ row }) => (
        <ReviewActions
          request={row}
          refreshList={props.fetch}
          approveMethod={approveCustomer}
          rejectMethod={rejectCustomer}
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
      expandableRow={CustomerCreateExpandableRow}
    />
  );
};

export const TableOptions: TableOptionsType = {
  table: 'CustomerCreateRequestsList',
  fetchData: createFetcher('marketplace-customer-creation-requests'),
  mapPropsToFilter: (props) => ({
    state: props.filter.state?.map((choice) => choice.value),
  }),
};

const mapStateToProps = (state: RootState) => ({
  filter: flowFilterFormSelector(state),
});

const enhance = compose(connect(mapStateToProps), connectTable(TableOptions));

export const CustomerCreateRequestsList = enhance(TableComponent);
