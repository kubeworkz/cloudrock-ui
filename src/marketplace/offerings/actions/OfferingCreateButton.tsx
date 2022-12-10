import { UISref } from '@uirouter/react';
import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';

export const OfferingCreateButton: FunctionComponent = () => (
  <UISref to="marketplace-offering-create">
    <Button bsSize="sm">
      <i className="fa fa-plus" /> {translate('Add offering')}
    </Button>
  </UISref>
);
