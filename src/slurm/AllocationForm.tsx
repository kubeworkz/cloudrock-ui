import { Component } from 'react';

import { getLatinNameValidators } from '@cloudrock/core/validators';
import { FormContainer, StringField, TextField } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { PlanDetailsTable } from '@cloudrock/marketplace/details/plan/PlanDetailsTable';
import { PlanField } from '@cloudrock/marketplace/details/plan/PlanField';
import { ProjectField } from '@cloudrock/marketplace/details/ProjectField';
import { OfferingConfigurationFormProps } from '@cloudrock/marketplace/types';

export class AllocationForm extends Component<OfferingConfigurationFormProps> {
  componentDidMount() {
    if (this.props.initialValues) {
      return;
    }
    const { project, plan } = this.props;
    const initialData = { ...this.props.initialAttributes, project, plan };
    if (!plan && this.props.offering.plans.length === 1) {
      initialData.plan = this.props.offering.plans[0];
    }
    this.props.initialize(initialData);
  }

  render() {
    const props = this.props;
    return (
      <form className="form-horizontal">
        <FormContainer
          submitting={false}
          labelClass="col-sm-3"
          controlClass="col-sm-9"
        >
          <ProjectField />
          <StringField
            label={translate('Allocation name')}
            name="attributes.name"
            description={translate(
              'This name will be visible in accounting data.',
            )}
            validate={getLatinNameValidators()}
            required={true}
          />
          <PlanField offering={props.offering} />
          <PlanDetailsTable offering={props.offering} />
          <TextField
            label={translate('Allocation description')}
            name="attributes.description"
          />
        </FormContainer>
      </form>
    );
  }
}
