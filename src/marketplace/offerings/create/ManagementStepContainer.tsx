import { connect } from 'react-redux';
import { compose } from 'redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { withTranslation } from '@cloudrock/i18n';
import {
  getOfferingTypes,
  showOfferingOptions,
  getProviderType,
  isOfferingTypeSchedulable,
  getPluginOptionsForm,
  getSecretOptionsForm,
  showBackendId,
  allowToUpdateService,
} from '@cloudrock/marketplace/common/registry';
import { openModalDialog } from '@cloudrock/modal/actions';
import { findProvider } from '@cloudrock/providers/registry';
import { RootState } from '@cloudrock/store/reducers';

import { getOffering, getType, getTypeLabel } from '../store/selectors';

import { ManagementStep, ManagementStepProps } from './ManagementStep';

const ServiceSettingsDetailsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ServiceSettingsDetailsDialog" */ './ServiceSettingsDetailsDialog'
    ),
  'ServiceSettingsDetailsDialog',
);

const mapStateToProps = (state: RootState) => {
  const offering = getOffering(state).offering;
  const props: Partial<ManagementStepProps> = {
    offeringTypes: getOfferingTypes(),
    editable: !offering,
    typeLabel: getTypeLabel(state),
  };
  const type = getType(state);
  if (type) {
    props.showOptions = showOfferingOptions(type);
    props.showBackendId = showBackendId(type);
    props.allowToUpdateService = allowToUpdateService(type);
    props.schedulable = isOfferingTypeSchedulable(type);
    props.pluginOptionsForm = getPluginOptionsForm(type);
    props.secretOptionsForm = getSecretOptionsForm(type);
    const providerType = getProviderType(type);
    if (providerType) {
      const providerConfig = findProvider(providerType);
      props.serviceSettingsForm = providerConfig.component;
    }
  }
  return props;
};

const mapDispatchToProps = (dispatch) => ({
  openServiceSettingsDetails: () =>
    dispatch(openModalDialog(ServiceSettingsDetailsDialog, { size: 'lg' })),
});

const connector = compose(
  withTranslation,
  connect(mapStateToProps, mapDispatchToProps),
);

export const ManagementStepContainer = connector(ManagementStep);
