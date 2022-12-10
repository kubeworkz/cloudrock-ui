import { translate } from '@cloudrock/i18n';
import { updateSnapshot } from '@cloudrock/openstack/api';
import {
  createNameField,
  createDescriptionField,
} from '@cloudrock/resource/actions/base';
import { UpdateResourceDialog } from '@cloudrock/resource/actions/UpdateResourceDialog';

export const EditDialog = ({ resolve: { resource } }) => {
  return (
    <UpdateResourceDialog
      fields={[
        createNameField(),
        createDescriptionField(),
        {
          name: 'kept_until',
          help_text: translate(
            'Guaranteed time of volume snapshot retention. If null - keep forever.',
          ),
          label: translate('Kept until'),
          required: false,
          type: 'datetime',
        },
      ]}
      resource={resource}
      initialValues={{
        name: resource.name,
        description: resource.description,
        kept_until: resource.kept_until,
      }}
      updateResource={updateSnapshot}
      verboseName={translate('volume snapshot')}
    />
  );
};
