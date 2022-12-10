import React from 'react';
import { useAsync } from 'react-use';

import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import {
  getCategory,
  getResourceOffering,
} from '@cloudrock/marketplace/common/api';
import { getTabs } from '@cloudrock/marketplace/details/OfferingTabs';
import { OfferingTabsComponent } from '@cloudrock/marketplace/details/OfferingTabsComponent';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

interface OfferingDetailsDialogProps {
  resolve: { resource: string };
}

async function loadData(resource: string) {
  const offering = await getResourceOffering(resource);
  const category = await getCategory(offering.category_uuid);
  const sections = category.sections;
  const tabs = getTabs({ offering, sections });
  return {
    offering,
    tabs,
  };
}

export const OfferingDetailsDialog: React.FC<OfferingDetailsDialogProps> = (
  props,
) => {
  const { loading, error, value } = useAsync(
    () => loadData(props.resolve.resource),
    [props.resolve.resource],
  );
  return (
    <ModalDialog
      title={translate('Offering details')}
      footer={<CloseDialogButton />}
    >
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <h3>{translate('Unable to load offering details.')}</h3>
      ) : (
        <>
          <h3>{value.offering.name}</h3>
          <p>
            <strong>{translate('Service provider:')}</strong>{' '}
            {value.offering.customer_name}
          </p>

          {value.offering.description && (
            <p className="bs-callout bs-callout-success">
              <FormattedHtml html={value.offering.description} />
            </p>
          )}
          <OfferingTabsComponent tabs={value.tabs} />
        </>
      )}
    </ModalDialog>
  );
};
