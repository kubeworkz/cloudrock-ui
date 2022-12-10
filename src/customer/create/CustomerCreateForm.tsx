import { useState, createElement, FunctionComponent } from 'react';

import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';

import { CustomerCreateFormData } from './types';
import { WizardFormFirstPage } from './WizardFormFirstPage';
import { WizardFormSecondPage } from './WizardFormSecondPage';

const WizardForms = [WizardFormFirstPage, WizardFormSecondPage];

interface CustomerCreateFormProps {
  onSubmit(formData: CustomerCreateFormData): void;
  initialValues?: CustomerCreateFormData;
}

export const CustomerCreateForm: FunctionComponent<CustomerCreateFormProps> = (
  props,
) => {
  const [step, setStep] = useState(1);
  const steps = [translate('General information')];
  if (!isFeatureVisible('customer.hide_organization_billing_step')) {
    steps.push(translate('Billing details'));
  }
  const isLast = step === steps.length;
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const submitLabel = isLast
    ? translate('Create organization')
    : translate('Next');

  const stepTitle = steps[step - 1];

  return createElement(WizardForms[step - 1], {
    onSubmit: isLast ? props.onSubmit : nextStep,
    onPrev: prevStep,
    submitLabel,
    step: step - 1,
    steps,
    stepTitle,
    initialValues: props.initialValues,
  });
};
