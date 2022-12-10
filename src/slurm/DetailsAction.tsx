import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const AllocationDetailsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SlurmAllocationDetailsDialog" */ './details/AllocationDetailsDialog'
    ),
  'AllocationDetailsDialog',
);

export const DetailsAction = ({ resource }) => (
  <DialogActionItem
    title={translate('Details')}
    modalComponent={AllocationDetailsDialog}
    resource={resource}
    dialogSize="lg"
  />
);
