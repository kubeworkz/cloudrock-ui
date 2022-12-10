import React from 'react';
import { Col } from 'react-bootstrap';

import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { StepsList } from '@cloudrock/marketplace/common/StepsList';

import { WizardButtons } from './WizardButtons';
import { WizardTabs } from './WizardTabs';

interface WizardProps extends TranslateProps {
  steps: string[];
  step: string;
  setStep?(step: string): void;
  goBack(): void;
  goNext(): void;
  submitting: boolean;
  invalid: boolean;
  isLastStep: boolean;
  tabs: { [key: string]: React.ComponentType<any> };
  submitLabel?: string;
  mountOnEnter?: boolean;
  getTabLabel(tab: string): string;
}

export const Wizard = withTranslation((props: WizardProps) => (
  <>
    <StepsList
      choices={props.steps}
      value={props.step}
      onClick={props.setStep}
      disabled={props.submitting}
      getTabLabel={props.getTabLabel}
    />
    <WizardTabs
      steps={props.steps}
      currentStep={props.step}
      tabs={props.tabs}
      mountOnEnter={props.mountOnEnter}
    />
    <div className="form-group">
      <Col smOffset={2} sm={8}>
        <WizardButtons
          isLastStep={props.isLastStep}
          goBack={props.goBack}
          goNext={props.goNext}
          submitting={props.submitting}
          invalid={props.invalid}
          submitLabel={props.submitLabel}
        />
      </Col>
    </div>
  </>
));
