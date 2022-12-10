import { FunctionComponent } from 'react';
import { FieldArray } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { OfferingComponent } from '@cloudrock/marketplace/types';

import { PlansList } from '../plan/PlansList';

import { ComponentsList } from './ComponentsList';
import { OfferingLimitsTable } from './OfferingLimitsTable';

interface AccountingStepProps {
  showComponents: boolean;
  showLimits: boolean;
  type?: string;
  removeOfferingComponent(component: string): void;
  removeOfferingQuotas(component: string): void;
  builtinComponents: OfferingComponent[];
  isUpdatingOffering: boolean;
}

export const AccountingStep: FunctionComponent<AccountingStepProps> = (props) =>
  props.type ? (
    <>
      {props.showLimits && props.builtinComponents.length > 0 && (
        <OfferingLimitsTable components={props.builtinComponents} />
      )}
      {props.showComponents && (
        <FieldArray
          name="components"
          component={ComponentsList}
          removeOfferingComponent={props.removeOfferingComponent}
          removeOfferingQuotas={props.removeOfferingQuotas}
          builtinComponents={props.builtinComponents}
          isUpdatingOffering={props.isUpdatingOffering}
        />
      )}
      {props.showComponents && <hr />}
      <FieldArray name="plans" component={PlansList} />
    </>
  ) : (
    <h3>{translate('Please select type in Management tab first.')}</h3>
  );
