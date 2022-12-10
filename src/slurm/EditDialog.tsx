import { translate } from '@cloudrock/i18n';
import {
  createNameField,
  createDescriptionField,
} from '@cloudrock/resource/actions/base';
import { UpdateResourceDialog } from '@cloudrock/resource/actions/UpdateResourceDialog';

import { updateAllocation } from './api';

const getFields = () => [createNameField(), createDescriptionField()];

export const EditDialog = ({ resolve: { resource } }) => {
  return (
    <UpdateResourceDialog
      fields={getFields()}
      resource={resource}
      initialValues={{
        name: resource.name,
        description: resource.description,
      }}
      updateResource={updateAllocation}
      verboseName={translate('SLURM allocation')}
    />
  );
};
