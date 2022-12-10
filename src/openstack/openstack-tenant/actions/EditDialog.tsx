import { translate } from '@cloudrock/i18n';
import { updateTenant } from '@cloudrock/openstack/api';
import {
  createLatinNameField,
  createDescriptionField,
} from '@cloudrock/resource/actions/base';
import { UpdateResourceDialog } from '@cloudrock/resource/actions/UpdateResourceDialog';

export const EditDialog = ({ resolve: { resource } }) => {
  return (
    <UpdateResourceDialog
      fields={[createLatinNameField(), createDescriptionField()]}
      resource={resource}
      initialValues={{
        name: resource.name,
        description: resource.description,
      }}
      updateResource={updateTenant}
      verboseName={translate('OpenStack tenant')}
    />
  );
};
