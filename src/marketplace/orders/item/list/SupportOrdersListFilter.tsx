import React from 'react';
import { Row } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { Option } from '@cloudrock/marketplace/common/registry';
import { SUPPORT_ORDERS_LIST_FILTER_FORM_ID } from '@cloudrock/marketplace/orders/item/list/constants';
import { OrganizationAutocomplete } from '@cloudrock/marketplace/orders/OrganizationAutocomplete';
import { ProjectFilter } from '@cloudrock/marketplace/resources/list/ProjectFilter';

import { OrderStateFilter } from './OrderStateFilter';

const getOrderStateFilterOptions = (): Option[] => [
  { value: 'executing', label: translate('Executing') },
  {
    value: 'requested for approval',
    label: translate('Requested for approval'),
  },
  { value: 'done', label: translate('Done') },
  { value: 'erred', label: translate('Erred') },
  { value: 'terminated', label: translate('Terminated') },
  { value: 'rejected', label: translate('Rejected') },
];

const PureSupportOrdersListFilter = () => (
  <Row>
    <OrganizationAutocomplete />
    <ProjectFilter />
    <OrderStateFilter options={getOrderStateFilterOptions} />
  </Row>
);

export const SupportOrdersListFilter = reduxForm({
  form: SUPPORT_ORDERS_LIST_FILTER_FORM_ID,
  initialValues: {
    state: getOrderStateFilterOptions()[0],
  },
})(PureSupportOrdersListFilter) as React.ComponentType;
