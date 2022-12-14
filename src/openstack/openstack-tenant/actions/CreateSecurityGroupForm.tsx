import { ControlLabel, FormGroup } from 'react-bootstrap';
import { Field, FieldArray } from 'redux-form';

import { getLatinNameValidators } from '@cloudrock/core/validators';
import { InputField } from '@cloudrock/form/InputField';
import { translate } from '@cloudrock/i18n';
import { RulesList } from '@cloudrock/openstack/openstack-security-groups/rule-editor/RulesList';
import { AsyncActionDialog } from '@cloudrock/resource/actions/AsyncActionDialog';

import { connectForm } from './utils';

export const CreateSecurityGroupForm = connectForm(
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
        title={translate('Create security group for OpenStack tenant {name}', {
          name: resource.name,
        })}
        loading={asyncState.loading}
        error={asyncState.error}
        submitting={submitting}
        invalid={invalid}
      >
        {asyncState.value ? (
          <>
            <FormGroup>
              <ControlLabel>{translate('Name')}</ControlLabel>
              <Field
                component={InputField}
                name="name"
                validate={getLatinNameValidators()}
                maxLength={150}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>{translate('Description')}</ControlLabel>
              <Field
                component={InputField}
                name="description"
                maxLength={2000}
              />
            </FormGroup>

            <FieldArray
              name="rules"
              component={RulesList}
              remoteSecurityGroups={asyncState.value}
            />
          </>
        ) : null}
      </AsyncActionDialog>
    </form>
  ),
);
