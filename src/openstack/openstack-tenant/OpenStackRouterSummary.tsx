import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import {
  Field,
  PureResourceSummaryBase,
  ResourceSummaryProps,
} from '@cloudrock/resource/summary';

export const OpenStackRouterSummary: FunctionComponent<ResourceSummaryProps> = (
  props,
) => {
  return (
    <>
      <PureResourceSummaryBase {...props} />
      <Field
        label={translate('Fixed IPs')}
        value={props.resource.fixed_ips.join(', ') || 'N/A'}
      />
    </>
  );
};
