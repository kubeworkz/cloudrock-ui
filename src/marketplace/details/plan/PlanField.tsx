import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { PlanDescriptionButton } from '@cloudrock/marketplace/details/plan/PlanDescriptionButton';
import { PlanSelectField } from '@cloudrock/marketplace/details/plan/PlanSelectField';
import { Offering } from '@cloudrock/marketplace/types';

interface PlanFieldProps {
  offering?: Offering;
}

export const PlanField: FunctionComponent<PlanFieldProps> = (props) =>
  props.offering.plans.length > 0 ? (
    <div className="form-group">
      <label className="control-label col-sm-3">
        {translate('Plan')}
        <span className="text-danger"> *</span>
      </label>
      <div className="col-sm-9">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexGrow: 1 }}>
            <PlanSelectField
              plans={props.offering.plans.filter(
                (plan) => plan.archived === false,
              )}
            />
          </div>
          <PlanDescriptionButton className="btn btn-md btn-default pull-right m-l-sm" />
        </div>
      </div>
    </div>
  ) : null;
