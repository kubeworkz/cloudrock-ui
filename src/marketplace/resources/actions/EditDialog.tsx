import { translate } from '@cloudrock/i18n';
import { updateResource } from '@cloudrock/marketplace/common/api';
import {
  createNameField,
  createDescriptionField,
} from '@cloudrock/resource/actions/base';
import { UpdateResourceDialog } from '@cloudrock/resource/actions/UpdateResourceDialog';

export const EditDialog = ({ resolve: { resource, reInitResource } }) => (
  <UpdateResourceDialog
    fields={[createNameField(), createDescriptionField()]}
    resource={resource}
    initialValues={{
      name: resource.name,
      description: resource.description,
    }}
    updateResource={updateResource}
    verboseName={translate('resource')}
    reInitResource={reInitResource}
  />
);
