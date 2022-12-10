import { FunctionComponent } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import { Field } from 'redux-form';

import { ENV } from '@cloudrock/configs/default';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';

export const RoleGroup: FunctionComponent<{ isProjectManager }> = ({
  isProjectManager,
}) =>
  isProjectManager ? (
    <FormGroup>
      <FormControl.Static>
        <strong>{translate('Role')}</strong>: {translate(ENV.roles.manager)}
      </FormControl.Static>
    </FormGroup>
  ) : (
    <>
      <FormGroup>
        <label>
          <Field name="role" component="input" type="radio" value="manager" />{' '}
          {translate(ENV.roles.manager)}
        </label>
      </FormGroup>
      <FormGroup>
        <label>
          <Field name="role" component="input" type="radio" value="admin" />{' '}
          {translate(ENV.roles.admin)}
        </label>
      </FormGroup>
      {isFeatureVisible('project.member_role') && (
        <FormGroup>
          <label>
            <Field name="role" component="input" type="radio" value="member" />{' '}
            {translate(ENV.roles.member)}
          </label>
        </FormGroup>
      )}
    </>
  );
