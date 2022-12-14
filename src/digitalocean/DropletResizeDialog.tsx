import { useCallback } from 'react';
import {
  ControlLabel,
  FormControl,
  FormGroup,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAsync } from 'react-use';
import { Field, reduxForm } from 'redux-form';

import { SubmitButton } from '@cloudrock/auth/SubmitButton';
import { getAll, post } from '@cloudrock/core/api';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { BaseResource } from '@cloudrock/resource/types';
import { formatFlavor } from '@cloudrock/resource/utils';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

import { RadioField } from './RadioField';
import { SelectField } from './SelectField';

interface Flavor {
  disk: number;
  cores: number;
  ram: number;
  url: string;
}

interface FlavorOption {
  label: string;
  value: string;
  disabled: boolean;
}

interface DropletResizeDialogFormData {
  flavor: FlavorOption;
  resizeType: 'permanent' | 'flexible';
}

interface DropletResizeDialogOwnProps {
  resolve: { resource: BaseResource & Flavor };
}

const isValidFlavor = (currentFlavor: Flavor, newFlavor: Flavor) => {
  // 1. New size should not be the same as the current size
  // 2. New size disk should not be lower then current size disk
  return (
    newFlavor.disk !== currentFlavor.disk &&
    newFlavor.cores !== currentFlavor.cores &&
    newFlavor.ram !== currentFlavor.ram &&
    newFlavor.disk >= currentFlavor.disk
  );
};

const getFlavors = async (currentFlavor: Flavor) => {
  const flavors = await getAll<Flavor>('/digitalocean-sizes/');
  return flavors
    .map((newFlavor) => ({
      label: formatFlavor(newFlavor),
      value: newFlavor.url,
      disabled: isValidFlavor(newFlavor, currentFlavor),
    }))
    .sort((flavor1, flavor2) =>
      // Enabled flavors should come first
      flavor1.disabled === flavor2.disabled ? 0 : flavor1.disabled ? 1 : -1,
    );
};

const ResizeTypeGroup = ({ submitting }) => (
  <>
    <FormGroup>
      <Field
        component={RadioField}
        name="resizeType"
        groupName="resizeType"
        value="flexible"
        disabled={submitting}
      >
        <strong>{translate('Flexible')}</strong>
        <p>
          {translate(
            "Increase a droplet's RAM and CPU only (not the storage).",
          )}
        </p>
      </Field>
    </FormGroup>

    <FormGroup>
      <Field
        component={RadioField}
        name="resizeType"
        groupName="resizeType"
        value="permanent"
        disabled={submitting}
      >
        <strong>{translate('Permanent')}</strong>
        <p>{translate("Increase a droplet's RAM, CPU and SSD disk.")}</p>
      </Field>
    </FormGroup>
  </>
);

const FlavorGroup = ({ resource, flavors, submitting }) => (
  <>
    <FormGroup>
      <FormControl.Static>
        <strong>{translate('Current size')}: </strong>
        {formatFlavor(resource)}
      </FormControl.Static>
    </FormGroup>
    <FormGroup>
      <ControlLabel>{translate('New size')}:</ControlLabel>
      <Field
        name="flavor"
        component={SelectField}
        placeholder={translate('Select size...')}
        options={flavors}
        disabled={submitting}
        isClearable={false}
        required={true}
      />
    </FormGroup>
  </>
);

export const DropletResizeDialog = reduxForm<
  DropletResizeDialogFormData,
  DropletResizeDialogOwnProps
>({ form: 'DropletResizeDialog', initialValues: { resizeType: 'flexible' } })(
  ({ resolve: { resource }, handleSubmit, submitting }) => {
    const {
      loading,
      error,
      value: flavors,
    } = useAsync(() => getFlavors(resource), [resource]);
    const dispatch = useDispatch();
    const resizeDroplet = useCallback(
      async (formData: DropletResizeDialogFormData) => {
        const payload = {
          size: formData.flavor.value,
          disk: formData.resizeType === 'permanent',
        };
        try {
          await post(
            `/digitalocean-droplets/${resource.uuid}/resize/`,
            payload,
          );
          dispatch(showSuccess(translate('Droplet has been resized.')));
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(
            showErrorResponse(e, translate('Unable to resize droplet.')),
          );
        }
      },
      [resource, dispatch],
    );
    return (
      <form onSubmit={handleSubmit(resizeDroplet)}>
        <ModalHeader>
          <ModalTitle>{translate('Resize droplet')}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <>{translate('Unable to load data.')}</>
          ) : (
            <>
              <FlavorGroup
                flavors={flavors}
                resource={resource}
                submitting={submitting}
              />
              <ResizeTypeGroup submitting={submitting} />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <SubmitButton
            block={false}
            submitting={submitting}
            label={translate('Submit')}
          />
          <CloseDialogButton />
        </ModalFooter>
      </form>
    );
  },
);
