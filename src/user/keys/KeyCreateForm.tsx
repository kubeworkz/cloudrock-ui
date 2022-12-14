import { useRouter } from '@uirouter/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { CancelButton } from '@cloudrock/form/CancelButton';
import { FieldError } from '@cloudrock/form/FieldError';
import { FormContainer } from '@cloudrock/form/FormContainer';
import { StringField } from '@cloudrock/form/StringField';
import { SubmitButton } from '@cloudrock/form/SubmitButton';
import { TextField } from '@cloudrock/form/TextField';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

import { createKey } from './api';

interface FormData {
  name: string;
  public_key: string;
}

const extractNameFromKey = (publicKey: string) => {
  if (publicKey) {
    const key = publicKey.split(' ');
    if (key.length === 3 && key[2]) {
      return key[2].trim();
    }
  }
  return '';
};

const PureKeyCreateForm: React.FC<InjectedFormProps<FormData>> = (props) => {
  useTitle(translate('Add SSH key'));
  const dispatch = useDispatch();
  const router = useRouter();

  const change = props.change;

  const processRequest = React.useCallback(
    async (values: FormData) => {
      let data = { ...values };
      try {
        if (!values.name) {
          const name = extractNameFromKey(values.public_key);
          data = { ...values, name };
          change('name', name);
        }
        await createKey(data);
        dispatch(showSuccess(translate('The key has been created.')));
        router.stateService.go('profile.keys');
      } catch (e) {
        dispatch(showErrorResponse(e, translate('Unable to create key.')));
      }
    },
    [dispatch, change, router],
  );

  return (
    <form
      onSubmit={props.handleSubmit(processRequest)}
      className="form-horizontal col-sm-10 col-xs-12"
    >
      <FormContainer
        submitting={props.submitting}
        labelClass="col-sm-3"
        controlClass="col-sm-7"
      >
        <StringField label={translate('Key name')} name="name" />
        <TextField
          label={translate('Public key')}
          name="public_key"
          required={true}
        />
      </FormContainer>
      <div className="form-group">
        <div className="col-sm-offset-3 col-sm-9">
          <FieldError error={props.error} />
          <SubmitButton
            className="btn btn-primary m-r-sm m-b-sm m-t-sm"
            submitting={props.submitting}
            label={translate('Add key')}
          />
          <CancelButton
            onClick={() => router.stateService.go('profile.keys')}
            label={translate('Cancel')}
          />
        </div>
      </div>
    </form>
  );
};

export const KeyCreateForm = reduxForm<FormData>({ form: 'keyCreate' })(
  PureKeyCreateForm,
);
