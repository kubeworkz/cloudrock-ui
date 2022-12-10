import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import {
  CUSTOMER_RESOURCES_FILTER_FORM_ID,
  RESOURCE_STATES,
} from '@cloudrock/marketplace/resources/list/constants';
import { ExpandableResourceSummary } from '@cloudrock/marketplace/resources/list/ExpandableResourceSummary';
import { ResourceCategoryField } from '@cloudrock/marketplace/resources/list/ResourceCategoryField';
import { ResourceNameField } from '@cloudrock/marketplace/resources/list/ResourceNameField';
import { ResourceStateField } from '@cloudrock/marketplace/resources/list/ResourceStateField';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { getCustomer } from '@cloudrock/workspace/selectors';
import { Customer } from '@cloudrock/workspace/types';

interface FieldProps {
  row: Resource;
}

export const TableComponent: FunctionComponent<any> = (props) => {
  const columns = [
    {
      title: translate('Name'),
      render: ({ row }) => (
        <ResourceNameField row={row} customer={props.customer} />
      ),
      orderField: 'name',
    },
    {
      title: translate('Project'),
      render: ({ row }: FieldProps) => row.project_name,
    },
    {
      title: translate('Category'),
      render: ResourceCategoryField,
    },
    {
      title: translate('Offering'),
      render: ({ row }: FieldProps) => row.offering_name,
    },
    {
      title: translate('Created at'),
      render: ({ row }: FieldProps) => formatDateTime(row.created),
      orderField: 'created',
    },
    {
      title: translate('State'),
      render: ResourceStateField,
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('Resources')}
      initialSorting={{ field: 'created', mode: 'desc' }}
      expandableRow={ExpandableResourceSummary}
      hasQuery={true}
    />
  );
};

const mapPropsToFilter = (props) => {
  const filter: Record<string, string | string[]> = {
    state: RESOURCE_STATES,
  };
  if (props.customer) {
    filter.customer_uuid = props.customer.uuid;
  }
  if (props.filter) {
    if (props.filter.state) {
      filter.state = props.filter.state.value;
    }
    if (props.filter.project) {
      filter.project_uuid = props.filter.project.uuid;
    }
    if (props.filter.category) {
      filter.category_uuid = props.filter.category.uuid;
    }
  }
  return filter;
};

const TableOptions = {
  table: 'CustomerResourcesList',
  fetchData: createFetcher('marketplace-resources'),
  mapPropsToFilter,
  queryField: 'query',
};

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
  filter: getFormValues(CUSTOMER_RESOURCES_FILTER_FORM_ID)(state),
});

interface StateProps {
  customer: Customer;
}

const enhance = compose(
  connect<StateProps>(mapStateToProps),
  connectTable(TableOptions),
);

export const CustomerResourcesList = enhance(TableComponent);
