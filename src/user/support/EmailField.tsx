import { useCallback, useState, FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { post } from '@cloudrock/core/api';
import { format } from '@cloudrock/core/ErrorMessageFormatter';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { showError, showSuccess } from '@cloudrock/store/notify';

import { RequestedEmail } from './RequestedEmail';

const UserEmailChangeDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "UserEmailChangeDialog" */ './UserEmailChangeDialog'
    ),
  'UserEmailChangeDialog',
);

export const EmailField: FunctionComponent<any> = (props) => {
  const [waiting, setWaiting] = useState(false);
  const dispatch = useDispatch();
  const openChangeDialog = useCallback(() => {
    dispatch(
      openModalDialog(UserEmailChangeDialog, {
        resolve: { user: props.user },
      }),
    );
  }, [dispatch, props.user]);
  const cancelRequest = useCallback(async () => {
    try {
      setWaiting(true);
      await post(`/users/${props.user.uuid}/cancel_change_email/`, {
        user: props.user,
      });
    } catch (error) {
      setWaiting(false);
      const errorMessage = `${translate('Unable to cancel request.')} ${format(
        error,
      )}`;
      dispatch(showError(errorMessage));
      return;
    }
    setWaiting(false);
    dispatch(
      showSuccess(translate('Email change request has been cancelled.')),
    );
  }, []);

  return (
    <>
      <div className="form-group">
        <label className="col-sm-3 col-md-4 col-lg-3 control-label">
          {translate('Email')}
        </label>
        <div className="col-sm-9 col-md-8">
          <p className="form-control-static">{props.user.email}</p>
          {!props.user.requested_email && !props.protected && (
            <Button onClick={openChangeDialog}>
              {translate('Change email')}
            </Button>
          )}
        </div>
      </div>
      {props.user.requested_email && !props.protected && (
        <RequestedEmail
          requestedEmail={props.user.requested_email}
          onCancelRequest={cancelRequest}
          waiting={waiting}
        />
      )}
    </>
  );
};
