import { Component } from 'react';
import { connect } from 'react-redux';

import { OFFERING_TYPE_BOOKING } from '@cloudrock/booking/constants';
import { required, getNameFieldValidators } from '@cloudrock/core/validators';
import {
  FormContainer,
  TextField,
  StringField,
  SelectField,
  NumberField,
} from '@cloudrock/form';
import { AsyncSelectField } from '@cloudrock/form/AsyncSelectField';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { CalendarField } from '@cloudrock/form/CalendarField';
import { DateField } from '@cloudrock/form/DateField';
import { SelectMultiCheckboxGroup } from '@cloudrock/form/SelectMultiCheckboxGroup';
import { TimeSelectField } from '@cloudrock/form/TimeSelectField';
import { translate } from '@cloudrock/i18n';
import {
  parseIntField,
  formatIntField,
} from '@cloudrock/marketplace/common/utils';
import { PlanDetailsTable } from '@cloudrock/marketplace/details/plan/PlanDetailsTable';
import { PlanField } from '@cloudrock/marketplace/details/plan/PlanField';
import { ProjectField } from '@cloudrock/marketplace/details/ProjectField';
import { getDefaultLimits } from '@cloudrock/marketplace/offerings/utils';
import { OfferingConfigurationFormProps } from '@cloudrock/marketplace/types';
import { RootState } from '@cloudrock/store/reducers';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { fetchTenantOptions, fetchInstanceOptions } from './api';

export class PureOfferingConfigurationForm extends Component<OfferingConfigurationFormProps> {
  componentDidMount() {
    if (this.props.initialValues) {
      return;
    }
    const attributes = { ...this.props.initialAttributes };
    if (this.props.offering.options.order) {
      this.props.offering.options.order.forEach((key) => {
        const options = this.props.offering.options.options[key];
        if (options && options.default !== undefined) {
          attributes[key] = options.default;
        }
      });
    }
    if (!attributes.schedules) {
      attributes.schedules = [];
    }
    const initialData: any = { attributes };
    if (this.props.plan) {
      initialData.plan = this.props.plan;
    } else if (this.props.offering.plans.length === 1) {
      initialData.plan = this.props.offering.plans[0];
    }
    initialData.project = this.props.project;
    initialData.limits = getDefaultLimits(this.props.offering);
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
          <ProjectField previewMode={props.previewMode} />
          <StringField
            name="attributes.name"
            label={translate('Name')}
            required={true}
            description={translate(
              'This name will be visible in accounting data.',
            )}
            validate={getNameFieldValidators()}
          />
          <PlanField offering={props.offering} />
          <PlanDetailsTable offering={props.offering} />
          <TextField
            name="attributes.description"
            label={translate('Description')}
          />
          {props.offering.options.order &&
            props.offering.options.order.map((key) => {
              const options = props.offering.options.options[key];
              if (!options) {
                return null;
              }
              let OptionField = StringField;
              let params = {};
              switch (options.type) {
                case 'text':
                  OptionField = TextField;
                  break;

                case 'select_string':
                  OptionField = SelectField;
                  params = {
                    options: options.choices.map((item) => ({
                      label: item,
                      value: item,
                    })),
                    noUpdateOnBlur: true,
                  };
                  break;

                case 'select_string_multi':
                  OptionField = SelectMultiCheckboxGroup;
                  params = {
                    options: options.choices,
                  };
                  break;

                case 'boolean':
                  OptionField = AwesomeCheckboxField;
                  params = { hideLabel: true };
                  break;

                case 'integer':
                  OptionField = NumberField;
                  params = {
                    parse: parseIntField,
                    format: formatIntField,
                  };
                  break;
                case 'date':
                  OptionField = DateField;
                  break;
                case 'time':
                  OptionField = TimeSelectField;
                  break;
                case 'select_openstack_tenant':
                  OptionField = AsyncSelectField;
                  params = {
                    loadOptions: (query, prevOptions, currentPage) =>
                      fetchTenantOptions(
                        query,
                        prevOptions,
                        currentPage,
                        props.customer.uuid,
                      ),
                    placeholder: translate('Select tenant...'),
                  };
                  break;
                case 'select_multiple_openstack_tenants':
                  OptionField = AsyncSelectField;
                  params = {
                    loadOptions: (query, prevOptions, currentPage) =>
                      fetchTenantOptions(
                        query,
                        prevOptions,
                        currentPage,
                        props.customer.uuid,
                      ),
                    placeholder: translate('Select tenants...'),
                    isMulti: true,
                  };
                  break;
                case 'select_openstack_instance':
                  OptionField = AsyncSelectField;
                  params = {
                    loadOptions: (query, prevOptions, currentPage) =>
                      fetchInstanceOptions(
                        query,
                        prevOptions,
                        currentPage,
                        props.customer.uuid,
                      ),
                    placeholder: translate('Select instance...'),
                  };
                  break;
                case 'select_multiple_openstack_instances':
                  OptionField = AsyncSelectField;
                  params = {
                    loadOptions: (query, prevOptions, currentPage) =>
                      fetchInstanceOptions(
                        query,
                        prevOptions,
                        currentPage,
                        props.customer.uuid,
                      ),
                    placeholder: translate('Select instance...'),
                    isMulti: true,
                  };
                  break;
              }
              return (
                <OptionField
                  key={key}
                  label={options.label}
                  name={`attributes.${key}`}
                  tooltip={options.help_text}
                  required={options.required}
                  validate={options.required ? required : undefined}
                  {...params}
                />
              );
            })}
          {props.offering.type === OFFERING_TYPE_BOOKING && (
            <CalendarField
              name="attributes.schedules"
              excludedEvents={this.props.offering.attributes.schedules || []}
              label={translate('Select dates')}
              offeringUuid={props.offering.uuid}
            />
          )}
        </FormContainer>
      </form>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
});

const enhance = connect(mapStateToProps);

export const OfferingConfigurationForm = enhance(PureOfferingConfigurationForm);
