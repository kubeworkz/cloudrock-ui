import { Component } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { getLatinNameValidators } from '@cloudrock/core/validators';
import {
  FormContainer,
  StringField,
  TextField,
  SecretField,
} from '@cloudrock/form';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { LabelField } from '@cloudrock/form/LabelField';
import { translate } from '@cloudrock/i18n';
import { PlanDetailsTable } from '@cloudrock/marketplace/details/plan/PlanDetailsTable';
import { PlanField } from '@cloudrock/marketplace/details/plan/PlanField';
import { ProjectField } from '@cloudrock/marketplace/details/ProjectField';
import { getDefaults } from '@cloudrock/marketplace/offerings/store/limits';
import { OfferingConfigurationFormProps } from '@cloudrock/marketplace/types';

import { OpenStackAllocationPool } from './OpenStackAllocationPool';
import { OpenStackSubnetField } from './OpenStackSubnetField';
import { validateSubnetPrivateCIDR } from './utils';

export class OpenStackPackageForm extends Component<OfferingConfigurationFormProps> {
  componentDidMount() {
    const { project, plan } = this.props;
    const defaults = getDefaults(this.props.offering);
    const initialData = {
      attributes: {
        subnet_cidr: '192.168.42.0/24',
        ...this.props.initialAttributes,
      },
      limits: this.props.initialLimits || defaults,
      project,
      plan,
    };
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
          submitting={props.submitting}
          labelClass="col-sm-3"
          controlClass="col-sm-9"
        >
          <ProjectField />
          <StringField
            label={translate('Tenant name')}
            name="attributes.name"
            description={translate(
              'This name will be visible in accounting data.',
            )}
            validate={getLatinNameValidators()}
            required={true}
            maxLength={64}
          />
          <PlanField offering={props.offering} />
          <PlanDetailsTable offering={props.offering} />
          <TextField
            label={translate('Tenant description')}
            name="attributes.description"
          />
          {ENV.plugins.CLOUDROCK_OPENSTACK.TENANT_CREDENTIALS_VISIBLE && (
            <LabelField label={translate('Access')} />
          )}
          {ENV.plugins.CLOUDROCK_OPENSTACK.TENANT_CREDENTIALS_VISIBLE && (
            <StringField
              label={translate('Initial admin username')}
              placeholder={translate('generate automatically')}
              tooltip={translate(
                'Leave blank if you want admin username to be auto-generated.',
              )}
              name="attributes.user_username"
            />
          )}
          {ENV.plugins.CLOUDROCK_OPENSTACK.TENANT_CREDENTIALS_VISIBLE && (
            <SecretField
              label={translate('Initial admin password')}
              placeholder={translate('generate automatically')}
              tooltip={translate(
                'Leave blank if you want admin password to be auto-generated.',
              )}
              name="attributes.user_password"
            />
          )}
          <OpenStackSubnetField
            label={translate('Internal network mask (CIDR)')}
            name="attributes.subnet_cidr"
            validate={validateSubnetPrivateCIDR}
          />
          <OpenStackAllocationPool
            label={translate('Internal network allocation pool')}
            name="attributes.subnet_allocation_pool"
          />
          {ENV.plugins.CLOUDROCK_CORE.ONLY_STAFF_MANAGES_SERVICES && (
            <AwesomeCheckboxField
              hideLabel={true}
              label={translate('Skip connection to external network')}
              name="attributes.skip_connection_extnet"
            />
          )}
        </FormContainer>
      </form>
    );
  }
}
