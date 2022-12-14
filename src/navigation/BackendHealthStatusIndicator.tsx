import Axios from 'axios';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { useAsync } from 'react-use';

import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const BackendHealthStatusDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BackendHealthStatusDialog" */ './BackendHealthStatusDialog'
    ),
  'BackendHealthStatusDialog',
);

export const getBackendHealthStatus = async () => {
  let response;
  try {
    response = await Axios.get(`${ENV.apiEndpoint}health-check/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return error.response.data;
  }
  return response.data;
};

const isWorking = (data): boolean => {
  for (const item of Object.values(data)) {
    if (item !== 'working') {
      return false;
    }
  }
  return true;
};

const openBackendHealthStatusDialog = () =>
  openModalDialog(BackendHealthStatusDialog);

export const PureBackendHealthStatusIndicator: FunctionComponent<any> = (
  props,
) => {
  const { value } = useAsync(getBackendHealthStatus, []);
  return value ? (
    <span className="m-r-sm">
      <a onClick={() => props.openDialog()}>
        {isWorking(value) ? (
          <i className="fa fa-check-circle text-success" />
        ) : (
          <i className="fa fa-times-circle text-danger" />
        )}
      </a>
    </span>
  ) : null;
};

const mapDispatchToProps = (dispatch) => ({
  openDialog: () => dispatch(openBackendHealthStatusDialog()),
});

const enhance = connect(null, mapDispatchToProps);

export const BackendHealthStatusIndicator = enhance(
  PureBackendHealthStatusIndicator,
);
