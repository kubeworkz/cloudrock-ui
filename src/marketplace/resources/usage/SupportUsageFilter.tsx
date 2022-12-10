import { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';

import { AccountingPeriodFilter } from '@cloudrock/customer/list/AccountingPeriodFilter';
import { PeriodOption } from '@cloudrock/form/types';
import { makeLastTwelveMonthsFilterPeriods } from '@cloudrock/form/utils';
import { OfferingAutocomplete } from '@cloudrock/marketplace/offerings/details/OfferingAutocomplete';
import { OrganizationAutocomplete } from '@cloudrock/marketplace/orders/OrganizationAutocomplete';
import { ProjectFilter } from '@cloudrock/marketplace/resources/list/ProjectFilter';
import { RootState } from '@cloudrock/store/reducers';
import { Customer, ORGANIZATION_WORKSPACE } from '@cloudrock/workspace/types';

interface SupportUsageFilterProps {
  options: PeriodOption[];
  customer: Customer;
}

const PureSupportUsageFilter: FunctionComponent<SupportUsageFilterProps> = (
  props,
) => (
  <Row>
    <AccountingPeriodFilter options={props.options} />
    <OrganizationAutocomplete />
    <ProjectFilter
      customer_uuid={props.customer ? props.customer.uuid : null}
    />
    <OfferingAutocomplete offeringFilter={{ shared: true }} />
  </Row>
);

export const FORM_ID = 'SupportUsageFilter';

const selector = formValueSelector(FORM_ID);

const mapStateToProps = createSelector(
  (state: RootState) => selector(state, ORGANIZATION_WORKSPACE),
  (customer) => ({
    customer,
    options: makeLastTwelveMonthsFilterPeriods(),
  }),
);

const enhance = compose(
  reduxForm({
    form: FORM_ID,
    initialValues: {
      accounting_period: makeLastTwelveMonthsFilterPeriods()[0],
    },
  }),
  connect(mapStateToProps),
);

export const SupportUsageFilter = enhance(PureSupportUsageFilter);
