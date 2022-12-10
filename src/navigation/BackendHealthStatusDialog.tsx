import { FunctionComponent } from 'react';
import { useAsyncFn, useEffectOnce } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { StateIndicator } from '@cloudrock/core/StateIndicator';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { getBackendHealthStatus } from '@cloudrock/navigation/BackendHealthStatusIndicator';

export const BackendHealthStatusDialog: FunctionComponent = () => {
  const [{ loading, value }, reFetch] = useAsyncFn(getBackendHealthStatus, []);

  useEffectOnce(() => {
    reFetch();
  });

  return (
    <ModalDialog
      title={translate('Backend health status')}
      footer={<CloseDialogButton />}
    >
      {loading ? (
        <LoadingSpinner />
      ) : value ? (
        <>
          <div className="pull-right">
            <button className="btn btn-default btn-sm" onClick={reFetch}>
              <i className="fa fa-refresh" /> {translate('Refresh')}
            </button>
          </div>
          <table className="table table-hover no-margins">
            <thead>
              <tr>
                <th>{translate('Check name')}</th>
                <th>{translate('Status')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(value).map(([key, value]: any, index: number) => (
                <tr key={index}>
                  <td>{key}</td>
                  <td>
                    <StateIndicator
                      label={value}
                      variant={value === 'working' ? 'primary' : 'danger'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </ModalDialog>
  );
};
