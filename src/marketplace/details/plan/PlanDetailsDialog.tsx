import React from 'react';
import { useAsync } from 'react-use';

import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import {
  getResource,
  getResourceOffering,
} from '@cloudrock/marketplace/common/api';
import { BillingPeriod } from '@cloudrock/marketplace/common/BillingPeriod';
import { getFormLimitParser } from '@cloudrock/marketplace/common/registry';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import { PureDetailsTable } from './PlanDetailsTable';
import { combinePrices } from './utils';

interface PlanDetailsDialogProps {
  resolve: { resourceId: string };
}

async function loadData(resourceId: string) {
  const resource = await getResource(resourceId);
  const offering = await getResourceOffering(resourceId);
  const plan =
    resource.plan && offering.plans.find((item) => item.url === resource.plan);
  const limitParser = getFormLimitParser(offering.type);
  return {
    offering,
    plan: plan && {
      ...plan,
      unit_price:
        typeof plan.unit_price === 'string'
          ? parseFloat(plan.unit_price)
          : plan.unit_price,
    },
    ...combinePrices(
      plan,
      limitParser(resource.limits),
      limitParser(resource.current_usages),
      offering,
    ),
  };
}

export const PlanDetailsDialog: React.FC<PlanDetailsDialogProps> = (props) => {
  const {
    loading,
    error,
    value: data,
  } = useAsync(
    () => loadData(props.resolve.resourceId),
    [props.resolve.resourceId],
  );
  return (
    <ModalDialog
      title={translate('Plan details')}
      footer={<CloseDialogButton />}
    >
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{translate('Unable to load plan details.')}</p>
      ) : !data.plan ? (
        <p>{translate('Resource does not have plan.')}</p>
      ) : (
        <>
          <p>
            <strong>{translate('Plan name')}</strong>: {data.plan.name}
          </p>
          {data.plan.description && (
            <p>
              <strong>{translate('Plan description')}</strong>:{' '}
              {data.plan.description}
            </p>
          )}
          {data.plan.unit_price > 0 && (
            <>
              <p>
                <strong>{translate('Plan price')}</strong>:{' '}
                {defaultCurrency(data.plan.unit_price)}
              </p>
              <p>
                <strong>{translate('Billing period')}</strong>:{' '}
                <BillingPeriod unit={data.plan.unit} />
              </p>
            </>
          )}
          <PureDetailsTable
            {...data}
            formGroupClassName=""
            columnClassName=""
            viewMode={true}
          />
        </>
      )}
    </ModalDialog>
  );
};
