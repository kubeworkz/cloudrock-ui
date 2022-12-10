import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';
import { reduxForm } from 'redux-form';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import {
  TextField,
  SelectField,
  FormContainer,
  FieldError,
  SubmitButton,
} from '@cloudrock/form';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { DateField } from '@cloudrock/form/DateField';
import {
  datePickerOverlayContainerInDialogs,
  reactSelectMenuPortaling,
  validateMaxLength,
} from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { isVisible } from '@cloudrock/store/config';
import { RootState } from '@cloudrock/store/reducers';
import { getCustomer, getWorkspace } from '@cloudrock/workspace/selectors';
import { USER_WORKSPACE } from '@cloudrock/workspace/types';

import * as api from './api';
import { ProjectNameField } from './ProjectNameField';

export interface ProjectCreateFormData {
  name: string;
  description: string;
  end_date: Date;
  type?;
}

const loadData = async () => {
  const projectTypes = await api.loadProjectTypes();
  const oecdCodes = await api.loadOecdCodes();
  return {
    projectTypes,
    oecdCodes,
  };
};

export const ProjectCreateForm = reduxForm<
  ProjectCreateFormData,
  { onSubmit; onCancel }
>({
  form: 'projectCreate',
})((props) => {
  const { loading, error, value } = useAsync(loadData);
  const customer = useSelector(getCustomer);
  const workspace = useSelector(getWorkspace);
  const showCode = useSelector((state: RootState) =>
    isVisible(state, 'project.oecd_fos_2007_code'),
  );
  const showIndustry = useSelector((state: RootState) =>
    isVisible(state, 'project.show_industry_flag'),
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <h3 className="text-center">
        {translate('Unable to load project types.')}
      </h3>
    );
  }

  return (
    <form
      onSubmit={props.handleSubmit(props.onSubmit)}
      className="form-horizontal"
    >
      <FormContainer
        submitting={props.submitting}
        labelClass="col-sm-3"
        controlClass="col-sm-5"
      >
        {ProjectNameField({ customer })}
        <TextField
          label={translate('Project description')}
          name="description"
          validate={validateMaxLength}
        />
        {showCode ? (
          <SelectField
            label={translate('OECD FoS code')}
            help_text={translate(
              'Please select OECD code corresponding to field of science and technology',
            )}
            name="oecd_fos_2007_code"
            options={value.oecdCodes}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => `${option.value}. ${option.label}`}
            isClearable={true}
            {...reactSelectMenuPortaling()}
          />
        ) : null}
        {showIndustry && (
          <AwesomeCheckboxField
            name="is_industry"
            label={translate(
              'Please mark if project is aimed at industrial use',
            )}
            hideLabel={true}
          />
        )}
        {value.projectTypes.length >= 1 && (
          <SelectField
            label={translate('Project type')}
            name="type"
            options={value.projectTypes}
            getOptionValue={(option) => option.url}
            getOptionLabel={(option) => option.name}
            isClearable={true}
          />
        )}
        <DateField
          name="end_date"
          label={translate('End date')}
          description={translate(
            'The date is inclusive. Once reached, all project resource will be scheduled for termination.',
          )}
          {...datePickerOverlayContainerInDialogs()}
          minDate={DateTime.now().plus({ days: 1 }).toISO()}
        />
      </FormContainer>
      <div className="form-group">
        <div className="col-sm-offset-3 col-sm-5">
          <FieldError error={props.error} />
          <SubmitButton
            disabled={props.invalid}
            submitting={props.submitting}
            label={
              workspace === USER_WORKSPACE
                ? translate('Edit request')
                : translate('Add project')
            }
          />
          <button
            type="button"
            className="btn btn-default m-l-sm"
            onClick={props.onCancel}
          >
            {translate('Cancel')}
          </button>
        </div>
      </div>
    </form>
  );
});
