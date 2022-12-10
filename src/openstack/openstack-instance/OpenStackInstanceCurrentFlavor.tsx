import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { formatFlavor } from '@cloudrock/resource/utils';

import { OpenStackInstance } from './types';

interface OpenStackInstanceCurrentFlavorProps {
  context: {
    resource: OpenStackInstance;
  };
}

export const OpenStackInstanceCurrentFlavor: FunctionComponent<OpenStackInstanceCurrentFlavorProps> =
  (props) => (
    <p>
      <strong>{translate('Current flavor')}: </strong>
      {props.context.resource.flavor_name} (
      {formatFlavor(props.context.resource)})
    </p>
  );
