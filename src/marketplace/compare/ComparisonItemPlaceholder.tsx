import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { LandingLink } from '@cloudrock/marketplace/links/LandingLink';

export const ComparisonItemPlaceholder: FunctionComponent = () => (
  <td
    style={{
      width: 230,
      verticalAlign: 'middle',
      textAlign: 'center',
    }}
  >
    <h3>
      <LandingLink>
        <i className="fa fa-plus-circle" /> {translate('Add item')}
      </LandingLink>
    </h3>
  </td>
);
