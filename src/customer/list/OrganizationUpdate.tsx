import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues, reduxForm } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import { ORGANIZATION_UPDATE_FORM_ID } from '@cloudrock/customer/list/constants';
import { SelectCountryField } from '@cloudrock/customer/list/SelectCountryField';
import { SelectOrganizationDivisionField } from '@cloudrock/customer/list/SelectOrganizationDivisionField';
import { updateOrganization } from '@cloudrock/customer/list/store/actions';
import { getInitialValuesOfOrganizationUpdateForm } from '@cloudrock/customer/list/utils';
import {
  FormContainer,
  NumberField,
  StringField,
  SubmitButton,
  TextField,
} from '@cloudrock/form';
import { EmailField } from '@cloudrock/form/EmailField';
import { translate } from '@cloudrock/i18n';

import { CustomerLogoUpdate } from '../details/CustomerLogoUpdate';

const PureOrganizationUpdate: FunctionComponent<any> = (props) => (
  <form
    onSubmit={props.handleSubmit(props.submitRequest)}
    className="form-horizontal"
    style={{ marginTop: '20px' }}
  >
    <FormContainer
      submitting={props.submitting}
      labelClass="col-sm-2"
      controlClass="col-sm-8"
    >
      <StringField
        name="name"
        label={translate('Name')}
        required={true}
        validate={required}
        maxLength={150}
      />

      <StringField
        name="uuid"
        label={translate('UUID')}
        required={true}
        validate={required}
        disabled={true}
      />

      <StringField
        name="abbreviation"
        label={translate('Abbreviation')}
        maxLength={12}
      />

      <SelectOrganizationDivisionField />

      <TextField
        name="contact_details"
        label={translate('Contact details')}
        rows={2}
      />

      <StringField
        name="registration_code"
        label={translate('Registration code')}
      />

      <NumberField
        name="agreement_number"
        label={translate('Agreement number')}
      />

      <NumberField name="sponsor_number" label={translate('Sponsor number')} />

      <EmailField name="email" label={translate('Email')} maxLength={75} />

      <StringField
        name="phone_number"
        label={translate('Phone number')}
        maxLength={255}
      />

      <TextField name="access_subnets" label={translate('Access subnets')} />

      <StringField
        name="homepage"
        label={translate('Homepage')}
        maxLength={255}
      />

      <SelectCountryField />

      <StringField name="vat_code" label={translate('VAT code')} />

      <NumberField
        name="default_tax_percent"
        label={translate('Tax percent')}
      />

      <CustomerLogoUpdate customer={props.customer} formData={props.formData} />

      <div className="form-group">
        <div
          className="col-sm-8 col-sm-offset-2"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <SubmitButton
            disabled={props.invalid}
            submitting={props.submitting}
            label={translate('Update')}
          />
        </div>
      </div>
    </FormContainer>
  </form>
);

const mapStateToProps = (state, ownProps) => ({
  initialValues: getInitialValuesOfOrganizationUpdateForm(ownProps.customer),
  formData: getFormValues(ORGANIZATION_UPDATE_FORM_ID)(state),
});

const mapDispatchToProps = (dispatch) => ({
  submitRequest: (formData) =>
    dispatch(
      updateOrganization({
        ...formData,
        country: formData.country?.value,
        division: formData.division?.url,
      }),
    ),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  connector,
  reduxForm({
    form: ORGANIZATION_UPDATE_FORM_ID,
  }),
);

export const OrganizationUpdate = enhance(PureOrganizationUpdate);
