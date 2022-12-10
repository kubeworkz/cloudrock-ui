import { ControlLabel } from 'react-bootstrap';
import Select from 'react-select';
import { Field } from 'redux-form';

import { getLatinNameValidators, required } from '@cloudrock/core/validators';
import { InputField } from '@cloudrock/form/InputField';
import { translate } from '@cloudrock/i18n';
import { AsyncActionDialog } from '@cloudrock/resource/actions/AsyncActionDialog';

import { connectServerGroupForm } from './utils';

export const getPolicies = () => [
  { value: 'affinity', label: translate('Affinity') },
];

export const CreateServerGroupForm = connectServerGroupForm(
  ({
    handleSubmit,
    submitting,
    invalid,
    submitRequest,
    asyncState,
    resource,
  }) => (
    <form onSubmit={handleSubmit(submitRequest)}>
      <AsyncActionDialog
        title={translate('Create server group for OpenStack tenant {name}', {
          name: resource.name,
        })}
        loading={asyncState.loading}
        error={asyncState.error}
        submitting={submitting}
        invalid={invalid}
      >
        {asyncState.value ? (
          <>
            <ControlLabel>{translate('Name')}</ControlLabel>
            <Field
              component={InputField}
              name="name"
              validate={getLatinNameValidators()}
              maxLength={150}
            />

            <ControlLabel>{translate('Policy')}</ControlLabel>
            <Field
              name="policy"
              component={(fieldProps) => (
                <Select
                  placeholder={translate('Select policy...')}
                  options={getPolicies()}
                  value={fieldProps.input.value}
                  onChange={(value) => fieldProps.input.onChange(value)}
                  isClearable={true}
                  required={true}
                  validate={required}
                />
              )}
            />
          </>
        ) : null}
      </AsyncActionDialog>
    </form>
  ),
);
