import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { approveProject, rejectProject } from './api';
import { ProjectCreateExpandableRow } from './ProjectCreateExpandableRow';
import { ReviewActions } from './ReviewActions';
import { getColumns } from './utils';

export const TableComponent: FunctionComponent<any> = (props) => {
  useTitle(translate('Project creation requests'));
  const columns = [
    ...getColumns(),
    {
      title: translate('Actions'),
      render: ({ row }) => (
        <ReviewActions
          request={row}
          refreshList={props.fetch}
          approveMethod={approveProject}
          rejectMethod={rejectProject}
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
      expandableRow={ProjectCreateExpandableRow}
    />
  );
};

export const TableOptions: TableOptionsType = {
  table: 'ProjectCreateRequestsList',
  fetchData: createFetcher('marketplace-project-creation-requests'),
  mapPropsToFilter: (props) => ({
    customer_uuid: props.customer?.uuid,
  }),
};

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
});

const enhance = compose(connect(mapStateToProps), connectTable(TableOptions));

export const ProjectCreateRequestsList = enhance(TableComponent);
