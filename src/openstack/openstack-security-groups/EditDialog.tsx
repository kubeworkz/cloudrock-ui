import { translate } from '@cloudrock/i18n';
import { updateSecurityGroup } from '@cloudrock/openstack/api';
import {
  createNameField,
  createDescriptionField,
} from '@cloudrock/resource/actions/base';
import { UpdateResourceDialog } from '@cloudrock/resource/actions/UpdateResourceDialog';

export const EditDialog = ({ resolve: { resource } }) => {
  return (
    <UpdateResourceDialog
      fields={[createNameField(), createDescriptionField()]}
      resource={resource}
      initialValues={{
        name: resource.name,
        description: resource.description,
      }}
      updateResource={updateSecurityGroup}
      verboseName={translate('security group')}
    />
  );
};
