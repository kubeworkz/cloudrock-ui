import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';

import { CopyToClipboard } from '@cloudrock/core/CopyToClipboard';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { getKubeconfigFile } from '@cloudrock/rancher/api';

const KubeconfigFilePanel = (props) => {
  return (
    <>
      <p>{translate('Put this into ~/.kube/config:')}</p>
      <pre style={{ height: 200 }}>{props.config}</pre>
      <CopyToClipboard value={props.config} />
      <p>
        <a
          href="https://kubernetes.io/docs/tasks/tools/install-kubectl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {translate('Then download (if needed) and run kubectl')}
        </a>
      </p>
    </>
  );
};

export const RancherClusterKubeconfigDialog: FunctionComponent<any> = (
  props,
) => {
  const { loading, error, value } = useAsync(() =>
    getKubeconfigFile(props.resolve.resource.uuid),
  );
  return (
    <ModalDialog
      title={translate('Kubeconfig file')}
      footer={<CloseDialogButton />}
    >
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>{translate('Unable to load data.')}</div>
      ) : (
        <KubeconfigFilePanel config={value} />
      )}
    </ModalDialog>
  );
};
