import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { AnonymousBreadcrumbsContainer } from '@cloudrock/marketplace/offerings/service-providers/shared/AnonymousBreadcrumbsContainer';
import { Offering } from '@cloudrock/marketplace/types';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import './PublicOfferingDetailsBreadcrumbs.scss';

const getBreadcrumbs = (offering: Offering): BreadcrumbItem[] => [
  {
    label: translate('Service providers'),
    state: 'marketplace-service-providers.details',
  },
  {
    label: offering.customer_name,
    state: 'marketplace-service-provider.details',
    params: {
      uuid: offering.customer_uuid,
    },
  },
  {
    label: offering.name,
  },
];

interface PublicOfferingDetailsBreadcrumbsProps {
  offering: Offering;
}

export const PublicOfferingDetailsBreadcrumbs: FunctionComponent<PublicOfferingDetailsBreadcrumbsProps> =
  ({ offering }) => {
    useBreadcrumbsFn(
      () => (offering ? getBreadcrumbs(offering) : []),
      [offering],
    );
    return offering ? (
      <div className="publicOfferingDetailsBreadcrumbs">
        <AnonymousBreadcrumbsContainer />
      </div>
    ) : null;
  };
