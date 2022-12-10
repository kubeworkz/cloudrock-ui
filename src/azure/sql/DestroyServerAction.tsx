import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DestroyActionItem } from '@cloudrock/resource/actions/DestroyActionItem';

import { destoryDatabaseServer } from '../api';

const validators = [validateState('OK', 'Erred')];

export const DestroyServerAction = ({ resource }) => (
  <DestroyActionItem
    validators={validators}
    resource={resource}
    apiMethod={destoryDatabaseServer}
    dialogSubtitle={translate(
      'Deleting PostgreSQL server will cause deletion of all databases created within server.',
    )}
  />
);
