import Axios from 'axios';
import { useCallback, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAsync } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import * as actions from '@cloudrock/providers/actions';
import { ProviderUpdateForm } from '@cloudrock/providers/ProviderUpdateForm';
import { findProvider } from '@cloudrock/providers/registry';

import { getOffering } from '../store/selectors';

interface ProviderData {
  type: string;
  name: string;
  uuid: string;
  options: Record<string, any>;
}

export const ServiceSettingsDetailsDialog: FunctionComponent = () => {
  const offeringData = useSelector(getOffering);
  const offeringScope = offeringData.offering.scope;
  const state = useAsync(async () => {
    const provider = (await Axios.get(offeringScope)).data as ProviderData;
    return {
      initialValues: {
        name: provider.name,
        type: findProvider(provider.type),
        uuid: provider.uuid,
        options: provider.options,
      },
      type: findProvider(provider.type),
    };
  }, [offeringScope]);

  const dispatch = useDispatch();
  const updateProvider = useCallback(
    (data) => actions.updateProvider(data, dispatch),
    [dispatch],
  );

  return (
    <ModalDialog
      title={translate('Provider details')}
      footer={<CloseDialogButton />}
    >
      {state.loading ? (
        <LoadingSpinner />
      ) : state.error ? (
        <h3>{translate('Unable to load provider details.')}</h3>
      ) : !state.value ? null : (
        <ProviderUpdateForm
          {...state.value}
          updateProvider={updateProvider}
          translate={translate}
        />
      )}
    </ModalDialog>
  );
};
