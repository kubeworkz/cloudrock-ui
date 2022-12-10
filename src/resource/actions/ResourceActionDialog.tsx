import { reduxForm } from 'redux-form';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { StringField, TextField, SelectField } from '@cloudrock/form';
import { AsyncSelectField } from '@cloudrock/form/AsyncSelectField';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { CronField } from '@cloudrock/form/CronField';
import { DateField } from '@cloudrock/form/DateField';
import { MonacoField } from '@cloudrock/form/MonacoField';
import { NumberField } from '@cloudrock/form/NumberField';
import { TimezoneField } from '@cloudrock/form/TimezoneField';
import { reactSelectMenuPortaling } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { ActionDialog } from '@cloudrock/modal/ActionDialog';

import { RESOURCE_ACTION_FORM } from './constants';

interface ResourceActionDialogOwnProps {
  submitForm(formData): void;
  dialogTitle: string;
  formFields?: any[];
  loading?: boolean;
  error?: Error;
}

const validateJSON = (value: string) => {
  try {
    JSON.parse(value);
  } catch (e) {
    return translate('This value is invalid JSON.');
  }
};

export const ResourceActionDialog = reduxForm<{}, ResourceActionDialogOwnProps>(
  { form: RESOURCE_ACTION_FORM },
)(
  ({
    submitForm,
    handleSubmit,
    submitting,
    invalid,
    dialogTitle,
    loading,
    error,
    formFields: fields,
  }) => {
    return (
      <ActionDialog
        title={dialogTitle}
        submitLabel={translate('Submit')}
        onSubmit={handleSubmit(submitForm)}
        submitting={submitting}
        invalid={invalid}
        layout="vertical"
      >
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          translate('Unable to load data.')
        ) : (
          fields.map((field, index) => {
            const props = {
              key: index,
              name: field.name,
              label: field.label,
              required: field.required,
              description: field.help_text,
            };
            if (field.component) {
              return <field.component {...props} />;
            } else if (field.type === 'string') {
              return (
                <StringField
                  {...props}
                  maxLength={field.maxlength}
                  pattern={field.pattern?.source}
                  validate={field.validate}
                  autoFocus
                />
              );
            } else if (field.type === 'text') {
              return <TextField {...props} maxLength={field.maxlength} />;
            } else if (field.type === 'json') {
              return (
                <MonacoField
                  {...props}
                  mode="json"
                  validate={validateJSON}
                  height={300}
                />
              );
            } else if (field.type === 'datetime') {
              return <DateField {...props} />;
            } else if (field.type === 'timezone') {
              return <TimezoneField {...props} />;
            } else if (field.type === 'crontab') {
              return <CronField {...props} />;
            } else if (field.type === 'integer') {
              return (
                <NumberField
                  {...props}
                  min={field.minValue}
                  max={field.maxValue}
                />
              );
            } else if (field.type === 'boolean') {
              return <AwesomeCheckboxField hideLabel={true} {...props} />;
            } else if (field.type === 'select') {
              return (
                <SelectField
                  {...props}
                  options={field.options}
                  simpleValue={true}
                  {...reactSelectMenuPortaling()}
                />
              );
            } else if (field.type === 'async_select') {
              return (
                <AsyncSelectField
                  {...props}
                  loadOptions={field.loadOptions}
                  getOptionLabel={field.getOptionLabel}
                  {...reactSelectMenuPortaling()}
                />
              );
            }
          })
        )}
      </ActionDialog>
    );
  },
);
