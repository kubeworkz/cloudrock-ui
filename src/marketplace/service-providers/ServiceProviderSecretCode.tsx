import { Component } from 'react';
import { connect } from 'react-redux';

import { TranslateProps } from '@cloudrock/i18n';
import { SecretValueField } from '@cloudrock/marketplace/SecretValueField';
import { ServiceProvider } from '@cloudrock/marketplace/types';
import { RootState } from '@cloudrock/store/reducers';
import { ActionButton } from '@cloudrock/table/ActionButton';

import './ServiceProviderSecretCode.scss';

import * as actions from './store/actions';
import * as selectors from './store/selectors';

interface ServiceProviderSecretCodeProps extends TranslateProps {
  serviceProvider: ServiceProvider;
  secretCode: {
    code: string;
    generating: boolean;
  };
  showSuccess?(message: string): void;
  showError?(message: string): void;
  showSecretCodeRegenerateConfirm(): void;
  getServiceProviderSecretCode(): void;
}

class PureServiceProviderSecretCode extends Component<ServiceProviderSecretCodeProps> {
  componentDidUpdate(prevProps) {
    if (
      this.props.serviceProvider &&
      prevProps.serviceProvider !== this.props.serviceProvider
    ) {
      this.props.getServiceProviderSecretCode();
    }
  }

  render() {
    return (
      <div className="service-provider-secret-code m-t-xs">
        <div className="service-provider-secret-code__label">
          {this.props.translate('API secret code:')}
        </div>
        <div className="service-provider-secret-code__value m-l-xs">
          <SecretValueField value={this.props.secretCode.code} />
        </div>
        <div className="service-provider-secret-code__generate-btn m-l-xs">
          <ActionButton
            title={this.props.translate('Regenerate')}
            action={this.props.showSecretCodeRegenerateConfirm}
            className="btn btn-primary"
            icon={
              this.props.secretCode.generating
                ? 'fa fa-spinner fa-spin'
                : undefined
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  secretCode: selectors.getServiceProviderSecretCode(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  showSecretCodeRegenerateConfirm: () =>
    dispatch(actions.showSecretCodeRegenerateConfirm(ownProps.serviceProvider)),
  getServiceProviderSecretCode: () =>
    dispatch(actions.secretCodeFetchStart(ownProps.serviceProvider)),
});

export const ServiceProviderSecretCode = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PureServiceProviderSecretCode);
