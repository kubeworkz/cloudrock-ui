import { useDispatch } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

import { LoginButton } from './LoginButton';

const AuthValimoDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AuthValimoDialog" */ './valimo/AuthValimoDialog'
    ),
  'AuthValimoDialog',
);

export const ValimoButton = () => {
  const dispatch = useDispatch();
  return (
    <LoginButton
      iconClass="fa-phone-square"
      label={ENV.plugins.CLOUDROCK_AUTH_VALIMO.LABEL}
      onClick={() => dispatch(openModalDialog(AuthValimoDialog))}
    />
  );
};
