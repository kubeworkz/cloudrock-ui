import { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import {
  AccountingRunningField,
  getOptions as AccountingRunningFieldOptions,
} from '@cloudrock/customer/list/AccountingRunningField';
import { SUPPORT_CUSTOMERS_FORM_ID } from '@cloudrock/customer/list/constants';
import { DivisionTypeFilter } from '@cloudrock/customer/list/DivisionTypeFilter';
import { SelectOrganizationDivisionField } from '@cloudrock/customer/list/SelectOrganizationDivisionField';
import { ServiceProviderFilter } from '@cloudrock/customer/list/ServiceProviderFilter';
import { translate } from '@cloudrock/i18n';

export const PureSupportCustomerFilter: FunctionComponent = () => (
  <Row>
    <div className="form-group col-sm-3">
      <label className="control-label">{translate('Accounting running')}</label>
      <AccountingRunningField />
    </div>
    <ServiceProviderFilter />
    <SelectOrganizationDivisionField isFilterForm={true} />
    <DivisionTypeFilter />
  </Row>
);

export const SupportCustomerFilter = reduxForm<{}, any>({
  form: SUPPORT_CUSTOMERS_FORM_ID,
  initialValues: {
    accounting_is_running: AccountingRunningFieldOptions()[0],
  },
})(PureSupportCustomerFilter);
