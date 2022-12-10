import { useSelector, useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { UsageReportContext } from '@cloudrock/marketplace/resources/usage/types';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';
import { isSupportOnly as isSupportOnlySelector } from '@cloudrock/workspace/selectors';

const ResourceCreateUsageDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ResourceCreateUsageDialog" */ '@cloudrock/marketplace/resources/usage/ResourceCreateUsageDialog'
    ),
  'ResourceCreateUsageDialog',
);

export const ReportUsageAction = ({ resource }: { resource: Resource }) => {
  const dispatch = useDispatch();
  const isSupportOnly = useSelector(isSupportOnlySelector);

  const callback = (props: UsageReportContext) => {
    dispatch(
      openModalDialog(ResourceCreateUsageDialog, {
        resolve: props,
      }),
    );
  };

  return (
    <ActionItem
      title={translate('Report usage')}
      action={() =>
        callback({
          offering_uuid: resource.offering_uuid,
          resource_uuid: resource.uuid,
          resource_name: resource.name,
          customer_name: resource.customer_name,
          project_name: resource.project_name,
          backend_id: resource.backend_id,
        })
      }
      disabled={
        (!resource.is_usage_based && !resource.is_limit_based) ||
        (isSupportOnly &&
          ['OK', 'Updating', 'Terminating'].includes(resource.state))
      }
    />
  );
};
