import { Component } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { createFilter } from 'react-select/dist/react-select.cjs.dev';
import { compose } from 'redux';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

import { fetchIdentityProviderOptions } from '@cloudrock/auth/saml2/utils';
import { reactSelectMenuPortaling } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';

import { loginSaml2 } from './store/actions';

class PureAuthSaml2Dialog extends Component<InjectedFormProps> {
  identityProviderAutocomplete(
    input: string,
    prevOptions,
    currentPage: number,
  ) {
    return fetchIdentityProviderOptions(input, prevOptions, currentPage);
  }

  render() {
    const { handleSubmit, invalid, submitting, pristine } = this.props;
    return (
      <form onSubmit={handleSubmit(loginSaml2)}>
        <div className="modal-header">
          <h3 className="modal-title">
            {translate('Please search for your organization')}
          </h3>
        </div>
        <div className="modal-body">
          <div className="saml-auth-form">
            <Field
              name="identity-provider"
              component={(fieldProps) => (
                <AsyncPaginate
                  loadOptions={(query, prevOptions, { page }) =>
                    this.identityProviderAutocomplete(query, prevOptions, page)
                  }
                  placeholder={translate('Select organization...')}
                  noOptionsMessage={() => translate('No results found')}
                  defaultOptions
                  getOptionValue={(option) => option.url}
                  getOptionLabel={(option) => option.name}
                  value={fieldProps.input.value}
                  onChange={fieldProps.input.onChange}
                  filterOptions={createFilter({
                    ignoreAccents: false,
                  })}
                  additional={{
                    page: 1,
                  }}
                  {...reactSelectMenuPortaling()}
                />
              )}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            disabled={invalid || submitting || pristine}
            type="submit"
            className="btn btn-success"
          >
            {translate('Login')}
          </button>
          <CloseDialogButton />
        </div>
      </form>
    );
  }
}

const enhance = compose(
  reduxForm({
    form: 'authSaml2Search',
  }),
);

export const AuthSaml2Dialog = enhance(PureAuthSaml2Dialog);
