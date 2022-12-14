import { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import { FILTER_OFFERING_RESOURCE } from '@cloudrock/marketplace/details/constants';
import { ResourceStateFilter } from '@cloudrock/marketplace/resources/list/ResourceStateFilter';

const PureOfferingResourcesFilter: FunctionComponent = () => (
  <Row>
    <ResourceStateFilter />
  </Row>
);

const enhance = reduxForm({
  form: FILTER_OFFERING_RESOURCE,
  initialValues: { state: { value: 'OK', label: 'OK' } },
});

export const OfferingResourcesFilter = enhance(PureOfferingResourcesFilter);
