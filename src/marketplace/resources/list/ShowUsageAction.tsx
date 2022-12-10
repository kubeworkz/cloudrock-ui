import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';

const ResourceShowUsageDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ResourceShowUsageDialog" */ '@cloudrock/marketplace/resources/usage/ResourceShowUsageDialog'
    ),
  'ResourceShowUsageDialog',
);

export const ShowUsageAction = ({ resource }: { resource: Resource }) => {
  const dispatch = useDispatch();
  const callback = (resource) => {
    dispatch(
      openModalDialog(ResourceShowUsageDialog, {
        resolve: {
          resource,
        },
        size: 'lg',
      }),
    );
  };
  return (
    <ActionItem
      title={translate('Show usage')}
      action={() =>
        callback({
          ...resource,
          offering_uuid:
            resource.marketplace_offering_uuid || resource.offering_uuid,
          resource_uuid: resource.marketplace_resource_uuid || resource.uuid,
        })
      }
      disabled={!resource.is_usage_based && !resource.is_limit_based}
    />
  );
};
