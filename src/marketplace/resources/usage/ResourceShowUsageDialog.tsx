import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { ResourceUsageTabsContainer } from '@cloudrock/marketplace/resources/usage/ResourceUsageTabsContainer';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

interface ResourceUsageDialogProps {
  resolve: {
    resource: Resource;
  };
}

export const ResourceShowUsageDialog: FunctionComponent<ResourceUsageDialogProps> =
  ({ resolve }) => (
    <ModalDialog
      title={translate('Resource usage for {resourceName}', {
        resourceName: resolve.resource.name,
      })}
      footer={<CloseDialogButton />}
    >
      <ResourceUsageTabsContainer resource={resolve.resource} />
    </ModalDialog>
  );
