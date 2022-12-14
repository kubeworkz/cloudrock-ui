import { FunctionComponent } from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import { Field } from 'redux-form';

import { reactSelectMenuPortaling } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { SelectField } from '@cloudrock/issues/create/SelectField';

export const ProjectGroup: FunctionComponent<{ customer; disabled }> = ({
  customer,
  disabled,
}) => (
  <FormGroup>
    <ControlLabel>
      {translate('Project')}
      <span className="text-danger">*</span>
    </ControlLabel>
    <Field
      name="project"
      component={SelectField}
      options={customer.projects}
      required={true}
      isDisabled={disabled}
      placeholder={translate('Select project')}
      getOptionValue={(option) => option.uuid}
      getOptionLabel={(option) => option.name}
      isClearable={true}
      {...reactSelectMenuPortaling()}
    />
  </FormGroup>
);
