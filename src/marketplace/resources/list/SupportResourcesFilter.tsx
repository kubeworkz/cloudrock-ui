import { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import { getInitialValues, syncFiltersToURL } from '@cloudrock/core/filters';
import { OfferingAutocomplete } from '@cloudrock/marketplace/offerings/details/OfferingAutocomplete';
import { OrganizationAutocomplete } from '@cloudrock/marketplace/orders/OrganizationAutocomplete';

import { CategoryFilter } from './CategoryFilter';
import { getStates, ResourceStateFilter } from './ResourceStateFilter';

const PureSupportResourcesFilter: FunctionComponent = () => (
  <Row>
    <OfferingAutocomplete />
    <OrganizationAutocomplete />
    <CategoryFilter />
    <ResourceStateFilter />
  </Row>
);

const enhance = reduxForm({
  form: 'SupportResourcesFilter',
  onChange: syncFiltersToURL,
  initialValues: getInitialValues({
    state: getStates()[1],
  }),
  destroyOnUnmount: false,
});

export const SupportResourcesFilter = enhance(PureSupportResourcesFilter);
