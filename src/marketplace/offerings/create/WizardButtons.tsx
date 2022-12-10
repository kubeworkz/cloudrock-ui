import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { ActionButton } from '@cloudrock/table/ActionButton';

interface WizardButtonsProps {
  goBack(): void;
  goNext(): void;
  submitting: boolean;
  invalid: boolean;
  isLastStep: boolean;
  submitLabel?: string;
}

export const WizardButtons: FunctionComponent<WizardButtonsProps> = ({
  isLastStep,
  goBack,
  goNext,
  submitting,
  invalid,
  submitLabel,
}) => (
  <div className="display-flex justify-content-between m-t-md">
    <ActionButton
      title={translate('Back')}
      action={goBack}
      icon="fa fa-arrow-left"
      className={classNames(
        { disabled: submitting },
        'btn btn-outline btn-default',
      )}
    />
    {!isLastStep && (
      <ActionButton
        title={translate('Next')}
        action={goNext}
        icon="fa fa-arrow-right"
        className="btn btn-primary"
      />
    )}
    {isLastStep && (
      <SubmitButton
        disabled={invalid}
        submitting={submitting}
        label={submitLabel || translate('Submit')}
      />
    )}
  </div>
);
