import { withTranslation } from '@cloudrock/i18n';
import { Field, PureResourceSummaryBase } from '@cloudrock/resource/summary';

const PureVMwarePortSummary = (props) => {
  const { translate, resource } = props;
  return (
    <>
      <PureResourceSummaryBase {...props} />
      <Field label={translate('MAC address')} value={resource.mac_address} />
      <Field label={translate('Network')} value={resource.network_name} />
    </>
  );
};

export const VMwarePortSummary = withTranslation(PureVMwarePortSummary);
