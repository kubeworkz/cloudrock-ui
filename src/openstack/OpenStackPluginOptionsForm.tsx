import { useMemo, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { FormContainer, SelectField, NumberField } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { FORM_ID } from '@cloudrock/marketplace/offerings/store/constants';
import { RootState } from '@cloudrock/store/reducers';

const pluginOptionsSelector = (state: RootState) =>
  formValueSelector(FORM_ID)(state, 'plugin_options');

export const OpenStackPluginOptionsForm: FunctionComponent<{ container }> = ({
  container,
}) => {
  const STORAGE_MODE_OPTIONS = useMemo(
    () => [
      {
        label: translate('Fixed — use common storage quota'),
        value: 'fixed',
      },
      {
        label: translate(
          'Dynamic — use separate volume types for tracking pricing',
        ),
        value: 'dynamic',
      },
    ],
    [],
  );

  const pluginOptions = useSelector(pluginOptionsSelector);

  return (
    <FormContainer {...container}>
      <SelectField
        name="storage_mode"
        label={translate('Storage mode')}
        options={STORAGE_MODE_OPTIONS}
        simpleValue={true}
        required={true}
        isClearable={false}
      />
      {pluginOptions && pluginOptions.storage_mode == 'dynamic' && (
        <NumberField
          name="snapshot_size_limit_gb"
          label={translate('Snapshot size limit')}
          unit="GB"
          description={translate(
            'Additional space to apply to storage quota to be used by snapshots.',
          )}
        />
      )}
    </FormContainer>
  );
};
