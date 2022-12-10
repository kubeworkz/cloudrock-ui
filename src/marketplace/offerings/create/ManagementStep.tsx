import React, { FunctionComponent, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FieldArray, FormSection } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import { FormContainer, SelectField, StringField } from '@cloudrock/form';
import { FormFieldsContext, FormLayoutContext } from '@cloudrock/form/context';
import { StaticField } from '@cloudrock/form/StaticField';
import { translate, TranslateProps } from '@cloudrock/i18n';
import { Option } from '@cloudrock/marketplace/common/registry';
import { ProviderFormProps } from '@cloudrock/providers/types';

import { OfferingOptions } from '../option/OfferingOptions';
import { OfferingScheduler } from '../option/OfferingScheduler';

export interface ManagementStepProps extends TranslateProps {
  pluginOptionsForm?: React.ComponentType<any>;
  secretOptionsForm?: React.ComponentType<any>;
  showOptions: boolean;
  schedulable?: boolean;
  serviceSettingsForm?: React.ComponentType<ProviderFormProps>;
  offeringTypes: Option[];
  editable: boolean;
  typeLabel?: string;
  showBackendId?: boolean;
  allowToUpdateService?: boolean;
  openServiceSettingsDetails(): void;
  dryRunOfferingScript(): void;
}

export const ManagementStep: FunctionComponent<ManagementStepProps> = (
  props,
) => {
  const { layout } = useContext(FormLayoutContext);
  const { readOnlyFields } = useContext(FormFieldsContext);
  const ContainerProps = {
    submitting: false,
    labelClass: layout === 'vertical' ? '' : 'col-sm-2',
    controlClass: layout === 'vertical' ? '' : 'col-sm-8',
    clearOnUnmount: false,
    layout,
  };
  const serviceSettingWrapperClass =
    layout === 'vertical' ? '' : 'col-sm-8 col-sm-offset-2';
  return (
    <>
      <FormContainer {...ContainerProps}>
        {props.editable ? (
          <SelectField
            name="type"
            label={translate('Type')}
            required={true}
            options={props.offeringTypes}
            isClearable={false}
            validate={required}
          />
        ) : (
          <StaticField
            label={translate('Type')}
            value={props.typeLabel}
            {...ContainerProps}
          />
        )}
      </FormContainer>
      {props.editable && props.serviceSettingsForm ? (
        <FormSection name="service_settings">
          {React.createElement(props.serviceSettingsForm, {
            translate,
            container: ContainerProps,
          })}
        </FormSection>
      ) : !props.showOptions &&
        props.typeLabel &&
        props.allowToUpdateService ? (
        <div className="form-group">
          <div className={serviceSettingWrapperClass}>
            <Button onClick={props.openServiceSettingsDetails}>
              {translate('Update service settings')}
            </Button>
          </div>
        </div>
      ) : null}
      {props.schedulable && (
        <FieldArray
          name="schedules"
          component={OfferingScheduler}
          layout={layout}
        />
      )}
      {props.showOptions && (
        <FieldArray
          name="options"
          component={OfferingOptions}
          layout={layout}
          readOnly={readOnlyFields.includes('options')}
        />
      )}
      {props.secretOptionsForm && (
        <FormSection name="secret_options">
          {React.createElement(props.secretOptionsForm, {
            container: ContainerProps,
            dryRunOfferingScript: props.dryRunOfferingScript,
          })}
        </FormSection>
      )}
      {props.showBackendId && (
        <FormContainer {...ContainerProps}>
          <StringField name="backend_id" label={translate('Backend ID')} />
        </FormContainer>
      )}
      {props.pluginOptionsForm && (
        <FormSection name="plugin_options">
          {React.createElement(props.pluginOptionsForm, {
            container: ContainerProps,
          })}
        </FormSection>
      )}
    </>
  );
};
