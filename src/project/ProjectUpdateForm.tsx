import { DateTime } from 'luxon';
import { FunctionComponent } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { isFeatureVisible } from '@cloudrock/features/connect';
import {
  FieldError,
  FormContainer,
  SelectField,
  StringField,
  SubmitButton,
  TextField,
} from '@cloudrock/form';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { DateField } from '@cloudrock/form/DateField';
import { StaticField } from '@cloudrock/form/StaticField';
import {
  datePickerOverlayContainerInDialogs,
  reactSelectMenuPortaling,
  validateMaxLength,
} from '@cloudrock/form/utils';
import { translate, TranslateProps } from '@cloudrock/i18n';

import { ProjectNameField } from './ProjectNameField';

interface ProjectUpdateFormData {
  name: string;
  description: string;
  end_date: string;
  backend_id: string;
}

interface ProjectUpdateFormProps extends TranslateProps, InjectedFormProps {
  updateProject(data: ProjectUpdateFormData): Promise<void>;
  project_type?: string;
  isStaff: boolean;
  isOwner: boolean;
  isDisabled: boolean;
  oecdCodes;
}

export const PureProjectUpdateForm: FunctionComponent<ProjectUpdateFormProps> =
  (props) => (
    <form
      onSubmit={props.handleSubmit(props.updateProject)}
      className="form-horizontal"
    >
      <FormContainer
        submitting={props.submitting}
        labelClass="col-sm-3"
        controlClass="col-sm-9"
      >
        {ProjectNameField({ isDisabled: props.isDisabled })}
        <TextField
          label={props.translate('Project description')}
          name="description"
          disabled={props.isDisabled}
          validate={validateMaxLength}
        />
        {props.oecdCodes && isFeatureVisible('project.oecd_fos_2007_code') ? (
          <SelectField
            label={translate('OECD FoS code')}
            help_text={translate(
              'Please select OECD code corresponding to field of science and technology',
            )}
            name="oecd_fos_2007_code"
            options={props.oecdCodes}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => `${option.value}. ${option.label}`}
            isClearable={true}
            {...reactSelectMenuPortaling()}
          />
        ) : null}
        {isFeatureVisible('project.show_industry_flag') && (
          <AwesomeCheckboxField
            name="is_industry"
            label={translate(
              'Please mark if project is aimed at industrial use',
            )}
            hideLabel={true}
          />
        )}
        {props.project_type && (
          <StaticField
            label={props.translate('Project type')}
            value={props.project_type}
          />
        )}
        <Field
          name="end_date"
          label={translate('End date')}
          description={translate(
            'The date is inclusive. Once reached, all project resource will be scheduled for termination.',
          )}
          component={DateField}
          {...datePickerOverlayContainerInDialogs()}
          disabled={props.isDisabled}
          minDate={DateTime.now().plus({ days: 1 }).toISO()}
        />
        <StringField
          label={translate('Backend ID')}
          name="backend_id"
          disabled={props.isDisabled}
        />
      </FormContainer>
      <div className="form-group">
        <div className="col-sm-offset-3 col-sm-9">
          <FieldError error={props.error} />
          <SubmitButton
            submitting={props.submitting}
            disabled={props.invalid || props.isDisabled}
            label={props.translate('Update project details')}
          />
        </div>
      </div>
    </form>
  );

export const ProjectUpdateForm = reduxForm({ form: 'projectUpdate' })(
  PureProjectUpdateForm,
);
