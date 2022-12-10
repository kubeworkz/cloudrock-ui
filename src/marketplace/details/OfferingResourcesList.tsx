import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import {
  FILTER_OFFERING_RESOURCE,
  TABLE_OFFERING_RESOURCE,
} from '@cloudrock/marketplace/details/constants';
import { PublicResourceLink } from '@cloudrock/marketplace/resources/list/PublicResourceLink';
import { PublicResourcesListPlaceholder } from '@cloudrock/marketplace/resources/list/PublicResourcesListPlaceholder';
import { ResourceStateField } from '@cloudrock/marketplace/resources/list/ResourceStateField';
import { ResourceState } from '@cloudrock/marketplace/resources/types';
import { PublicResourceActions } from '@cloudrock/marketplace/resources/usage/PublicResourceActions';
import { Offering } from '@cloudrock/marketplace/types';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';

interface OfferingResourceFilter {
  state?: ResourceState;
}

interface StateProps {
  filter: OfferingResourceFilter;
}

interface OwnProps {
  offering: Offering;
}

export const TableComponent: FunctionComponent<any> = (props) => {
  const columns = [
    {
      title: translate('Name'),
      render: PublicResourceLink,
      orderField: 'name',
    },
    {
      title: translate('Client organization'),
      render: ({ row }) => <>{row.customer_name}</>,
    },
    {
      title: translate('Project'),
      render: ({ row }) => <>{row.project_name}</>,
    },
    {
      title: translate('Plan'),
      render: ({ row }) => <>{row.plan_name || 'N/A'}</>,
    },
    {
      title: translate('Created at'),
      render: ({ row }) => formatDateTime(row.created),
      orderField: 'created',
    },
    {
      title: translate('State'),
      render: ResourceStateField,
    },
    {
      title: translate('Actions'),
      render: PublicResourceActions,
    },
  ];

  return (
    <Table
      {...props}
      placeholderComponent={<PublicResourcesListPlaceholder />}
      columns={columns}
      verboseName={translate('offering resources')}
      enableExport={true}
      initialSorting={{ field: 'created', mode: 'desc' }}
      hasQuery={true}
      showPageSizeSelector={true}
    />
  );
};

const mapPropsToFilter = (props) => {
  const filter: Record<string, string> = {};
  if (props.filter && props.filter.state) {
    filter.state = props.filter.state.value;
  }
  return {
    offering_uuid: props.offering.uuid,
    ...filter,
  };
};

const exportRow = (row) => [
  row.name,
  row.uuid,
  row.customer_name,
  row.plan_name,
  row.state,
];

const exportFields = [
  'Name',
  'Resource UUID',
  'Client organization',
  'Plan',
  'State',
];

export const TableOptions = {
  table: TABLE_OFFERING_RESOURCE,
  fetchData: createFetcher('marketplace-resources'),
  mapPropsToFilter,
  exportRow,
  exportFields,
  queryField: 'query',
};

const mapStateToProps = (state: RootState) => ({
  filter: getFormValues(FILTER_OFFERING_RESOURCE)(state),
});

const enhance = compose(
  connect<StateProps, {}, OwnProps>(mapStateToProps),
  connectTable(TableOptions),
);

export const OfferingResourcesList = enhance(TableComponent);
