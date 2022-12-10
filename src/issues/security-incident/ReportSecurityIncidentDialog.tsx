import { FunctionComponent } from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import {
  FormContainer,
  SelectField,
  SubmitButton,
  TextField,
} from '@cloudrock/form';
import { DateField } from '@cloudrock/form/DateField';
import { InputField } from '@cloudrock/form/InputField';
import { translate } from '@cloudrock/i18n';
import { FileField } from '@cloudrock/issues/create/FileField';
import {
  ProjectGroup,
  ResourceGroup,
} from '@cloudrock/issues/create/IssueQuickCreate';
import {
  REPORT_INCIDENT,
  REPORT_SECURITY_INCIDENT_FORM_ID,
} from '@cloudrock/issues/security-incident/constants';
import {
  getSecurityIncidentTypeOptions,
  reportSecurityIncidentProjectSelector,
} from '@cloudrock/issues/security-incident/utils';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { getCustomer } from '@cloudrock/workspace/selectors';

const PureReportSecurityIncidentDialog: FunctionComponent<any> = (props) => (
  <form onSubmit={props.handleSubmit(props.submitRequest)}>
    <ModalDialog
      title={translate('Report security incident')}
      footer={
        <>
          <CloseDialogButton />
          <SubmitButton
            disabled={props.invalid}
            submitting={props.submitting}
            label={translate('Report')}
          />
        </>
      }
    >
      <FormContainer submitting={props.submitting} clearOnUnmount={true}>
        <DateField
          name="date"
          label={translate('Date and time of incident')}
          required
        />

        <SelectField
          label={translate('Type of incident')}
          name="type"
          placeholder={translate('Select incident type')}
          required={true}
          options={getSecurityIncidentTypeOptions()}
          isClearable={true}
          validate={required}
        />

        <Field
          name="summary"
          component={InputField}
          required={true}
          label={translate('Title')}
          maxLength={120}
        />

        <TextField
          name="description"
          label={translate('Description')}
          maxLength={160}
        />

        {props.resolve.showProjectField && (
          <ProjectGroup
            disabled={props.submitting}
            customer={useSelector(getCustomer)}
            formId={REPORT_SECURITY_INCIDENT_FORM_ID}
          />
        )}

        {props.resolve.showResourceField && (
          <ResourceGroup
            disabled={props.submitting}
            project={useSelector(reportSecurityIncidentProjectSelector)}
            formId={REPORT_SECURITY_INCIDENT_FORM_ID}
          />
        )}

        <FormGroup>
          <ControlLabel>{translate('Attachments')}</ControlLabel>
          <Field
            name="files"
            component={FileField}
            disabled={props.submitting}
          />
        </FormGroup>
      </FormContainer>
    </ModalDialog>
  </form>
);

const mapDispatchToProps = (dispatch) => ({
  submitRequest: (formData) => REPORT_INCIDENT(formData, dispatch),
});

const connector = connect(null, mapDispatchToProps);

const enhance = compose(
  connector,
  reduxForm({
    form: REPORT_SECURITY_INCIDENT_FORM_ID,
  }),
);

export const ReportSecurityIncidentDialog = enhance(
  PureReportSecurityIncidentDialog,
);
