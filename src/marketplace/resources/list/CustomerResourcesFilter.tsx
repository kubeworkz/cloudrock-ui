import React from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { getInitialValues, syncFiltersToURL } from '@cloudrock/core/filters';
import { CUSTOMER_RESOURCES_FILTER_FORM_ID } from '@cloudrock/marketplace/resources/list/constants';
import { RootState } from '@cloudrock/store/reducers';
import { getCustomer } from '@cloudrock/workspace/selectors';
import { Customer } from '@cloudrock/workspace/types';

import { CategoryFilter } from './CategoryFilter';
import { ProjectFilter } from './ProjectFilter';
import { getStates, ResourceStateFilter } from './ResourceStateFilter';

interface CustomerResourcesFilterProps {
  customer: Customer;
}

const PureCustomerResourcesFilter: React.FC<CustomerResourcesFilterProps> = (
  props,
) => (
  <Row>
    <ProjectFilter customer_uuid={props.customer.uuid} />
    <CategoryFilter />
    <ResourceStateFilter />
  </Row>
);

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
});

const enhance = compose(
  reduxForm({
    form: CUSTOMER_RESOURCES_FILTER_FORM_ID,
    onChange: syncFiltersToURL,
    initialValues: getInitialValues({
      state: getStates()[1],
    }),
  }),
  connect(mapStateToProps),
);

export const CustomerResourcesFilter = enhance(PureCustomerResourcesFilter);
