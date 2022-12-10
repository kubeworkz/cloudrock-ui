import { ControlLabel, FormGroup } from 'react-bootstrap';
import { Field } from 'redux-form';

import { SelectField } from '@cloudrock/form';
import { reactSelectMenuPortaling } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { AsyncActionDialog } from '@cloudrock/resource/actions/AsyncActionDialog';

import { connectForm } from './utils';

export const UpdateSecurityGroupsForm = connectForm(
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
        title={translate(
          'Update security groups for OpenStack instance {name}',
          {
            name: resource.name,
          },
        )}
        loading={asyncState.loading}
        error={asyncState.error}
        submitting={submitting}
        invalid={invalid}
      >
        {asyncState.value ? (
          <FormGroup>
            <ControlLabel>{translate('Security groups')}</ControlLabel>
            <Field
              component={SelectField}
              name="security_groups"
              placeholder={translate('Select security groups...')}
              options={asyncState.value}
              isMulti={true}
              {...reactSelectMenuPortaling()}
            />
          </FormGroup>
        ) : null}
      </AsyncActionDialog>
    </form>
  ),
);
