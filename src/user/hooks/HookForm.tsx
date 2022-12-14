import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';

import { titleCase } from '@cloudrock/core/utils';
import { required } from '@cloudrock/core/validators';
import { StringField } from '@cloudrock/form';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { translate } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';

import { HookTypeField } from './HookTypeField';
import { MultiSelectField } from './MultiSelectField';
import { EventGroupOption } from './types';

interface OwnProps {
  isNew: boolean;
  eventGroups: EventGroupOption[];
}

const selector = formValueSelector('HookForm');

export const HookForm: React.FC<OwnProps> = ({ isNew, eventGroups }) => {
  const hookType = useSelector((state: RootState) =>
    selector(state, 'hook_type'),
  );
  return (
    <>
      {isNew ? (
        <FormGroup>
          <Field
            name="hook_type"
            component={HookTypeField}
            validate={required}
          />
        </FormGroup>
      ) : (
        <>
          <p className="form-control-static">
            <strong>{translate('Notification method')}: </strong>
            {titleCase(hookType)}
          </p>
          <Field
            name="is_active"
            component={AwesomeCheckboxField}
            label={translate('Enabled')}
          />
        </>
      )}

      {hookType == 'email' ? (
        <FormGroup>
          <Field
            name="email"
            component={StringField}
            type="email"
            placeholder={translate('Email address')}
            validate={required}
          />
        </FormGroup>
      ) : hookType == 'webhook' ? (
        <FormGroup>
          <Field
            name="destination_url"
            component={StringField}
            type="url"
            placeholder={translate('Destination URL')}
            validate={required}
          />
        </FormGroup>
      ) : null}

      <Field
        name="event_groups"
        component={MultiSelectField}
        options={eventGroups}
      />
    </>
  );
};
