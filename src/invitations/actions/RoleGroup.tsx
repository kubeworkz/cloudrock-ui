import { FunctionComponent } from 'react';
import { ControlLabel, FormGroup, ToggleButton } from 'react-bootstrap';
import { Field } from 'redux-form';

import { ToggleButtonGroupInput } from '@cloudrock/form/ToggleButtonGroupInput';
import { translate } from '@cloudrock/i18n';

export const RoleGroup: FunctionComponent<{ roles }> = ({ roles }) => (
  <FormGroup>
    <ControlLabel>{translate('Role')}</ControlLabel>
    <div>
      <Field
        name="role"
        component={ToggleButtonGroupInput}
        type="radio"
        defaultValue={roles[0].value}
      >
        {roles.map((role, index) => (
          <ToggleButton key={index} value={role.value}>
            <i className={`fa ${role.icon}`} /> {translate(role.title)}
          </ToggleButton>
        ))}
      </Field>
    </div>
  </FormGroup>
);
