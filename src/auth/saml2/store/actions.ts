import { createFormAction } from 'redux-form-saga';

export const loginSaml2 = createFormAction('cloudrock/login/SAML2');

export const loginSaml2Action = (url) => ({
  type: loginSaml2.REQUEST,
  payload: {
    'identity-provider': {
      url,
    },
  },
});
