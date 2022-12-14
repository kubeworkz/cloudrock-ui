import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { AwesomeCheckbox } from '@cloudrock/core/AwesomeCheckbox';
import { required } from '@cloudrock/core/validators';
import { ADD_PAYMENT_PROFILE_FORM_ID } from '@cloudrock/customer/payment-profiles/constants';
import { addPaymentProfile } from '@cloudrock/customer/payment-profiles/store/actions';
import { getPaymentProfileTypeOptions } from '@cloudrock/customer/payment-profiles/utils';
import {
  FormContainer,
  NumberField,
  SelectField,
  StringField,
  SubmitButton,
  TextField,
} from '@cloudrock/form';
import { DateField } from '@cloudrock/form/DateField';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

const PaymentProfileCreate = (props) => {
  useTitle(translate('Add payment profile'));

  const [isFixedPrice, setIsFixedPrice] = useState(false);

  const paymentProfileTypeOptions = useMemo(
    () => getPaymentProfileTypeOptions(),
    [],
  );

  return (
    <form
      onSubmit={props.handleSubmit(props.submitRequest)}
      className="form-horizontal"
    >
      <FormContainer
        submitting={false}
        labelClass="col-sm-2"
        controlClass="col-sm-8"
        clearOnUnmount={false}
      >
        <StringField
          name="name"
          label={translate('Name')}
          required={true}
          validate={required}
          maxLength={150}
        />

        <SelectField
          name="payment_type"
          label={translate('Type')}
          required={true}
          options={paymentProfileTypeOptions}
          isClearable={false}
          validate={required}
          onChange={(value: any) =>
            setIsFixedPrice(value.value === 'fixed_price')
          }
        />

        {isFixedPrice ? (
          <DateField name="end_date" label={translate('End date')} />
        ) : null}

        {isFixedPrice && (
          <TextField
            name="agreement_number"
            label={translate('Agreement number')}
            maxLength={150}
          />
        )}

        {isFixedPrice && (
          <NumberField name="contract_sum" label={translate('Contract sum')} />
        )}

        <Field
          name="enabled"
          component={(prop) => (
            <AwesomeCheckbox
              label={translate('Enable profile after creation')}
              {...prop.input}
            />
          )}
        />

        <div className="form-group">
          <div
            className="col-sm-8 col-sm-offset-2"
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <SubmitButton
              disabled={props.invalid}
              submitting={props.submitting}
              label={translate('Submit')}
            />
          </div>
        </div>
      </FormContainer>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  submitRequest: (formData) => dispatch(addPaymentProfile(formData)),
});

const connector = connect(null, mapDispatchToProps);

const enhance = compose(
  connector,
  reduxForm({
    form: ADD_PAYMENT_PROFILE_FORM_ID,
  }),
);

export const PaymentProfileCreateContainer = enhance(PaymentProfileCreate);
