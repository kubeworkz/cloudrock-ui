import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAsync } from 'react-use';
import { reduxForm } from 'redux-form';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { getResourceOffering } from '@cloudrock/marketplace/common/api';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { Flavor } from '@cloudrock/openstack/openstack-instance/types';
import { createNode } from '@cloudrock/rancher/api';
import { Cluster } from '@cloudrock/rancher/types';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

import { NodeFlavorGroup } from './NodeFlavorGroup';
import { NodeRoleGroup } from './NodeRoleGroup';
import { NodeStorageGroup } from './NodeStorageGroup';
import { SubnetGroup } from './SubnetGroup';
import { loadData } from './utils';

interface OwnProps {
  resolve: { resource: any };
  flavors: any[];
  subnets: any[];
}

interface FormData {
  flavor: Flavor;
  system_volume_size: number;
  system_volume_type: string;
  roles: string[];
  attributes: {
    subnet: string;
  };
}

const defaultProps = {
  labelClassName: 'control-label col-sm-3',
  valueClassName: 'col-sm-9',
};

const serializeDataVolume = ({ size, ...volumeRest }) => ({
  ...volumeRest,
  size: size * 1024,
});

const serializeNode = (cluster, formData) => ({
  cluster: cluster.url,
  roles: formData.roles.filter((role) => role),
  subnet: formData.attributes.subnet,
  flavor: formData.flavor.url,
  system_volume_size: formData.system_volume_size * 1024,
  system_volume_type: formData.system_volume_type,
  data_volumes: (formData.data_volumes || []).map(serializeDataVolume),
});

const loadNodeCreateData = async (cluster: Cluster) => {
  const offering = await getResourceOffering(cluster.marketplace_resource_uuid);
  return await loadData(cluster.tenant_settings, offering);
};

export const CreateNodeDialog = reduxForm<FormData, OwnProps>({
  form: 'RancherNodeCreate',
})((props) => {
  const cluster = props.resolve.resource;
  const state = useAsync(() => loadNodeCreateData(cluster), [cluster]);

  const dispatch = useDispatch();

  const callback = useCallback(
    async (formData: FormData) => {
      try {
        await createNode(serializeNode(cluster, formData));
      } catch (error) {
        dispatch(showErrorResponse(error, translate('Unable to create node.')));
        return;
      }
      dispatch(showSuccess(translate('Node has been created.')));
      dispatch(closeModalDialog());
    },
    [dispatch, cluster],
  );

  return (
    <form className="form-horizontal" onSubmit={props.handleSubmit(callback)}>
      <ModalDialog
        title={translate('Create node')}
        footer={
          <>
            <CloseDialogButton />
            <SubmitButton
              disabled={state.loading || props.invalid || props.submitting}
              submitting={props.submitting}
              label={translate('Create node')}
            />
          </>
        }
      >
        {state.loading ? (
          <LoadingSpinner />
        ) : state.error ? (
          <p>{translate('Unable to load data.')}</p>
        ) : (
          <>
            <NodeRoleGroup {...defaultProps} />
            <NodeFlavorGroup options={state.value.flavors} {...defaultProps} />
            <SubnetGroup options={state.value.subnets} {...defaultProps} />
            <NodeStorageGroup
              volumeTypes={state.value.volumeTypes}
              mountPoints={state.value.mountPoints}
              defaultVolumeType={state.value.defaultVolumeType}
              smOffset={3}
              sm={9}
              {...defaultProps}
            />
          </>
        )}
      </ModalDialog>
    </form>
  );
});
