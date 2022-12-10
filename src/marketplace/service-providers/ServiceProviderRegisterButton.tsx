import { FunctionComponent } from 'react';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { TranslateProps } from '@cloudrock/i18n';
import { ServiceProvider } from '@cloudrock/marketplace/types';
import { ActionButton } from '@cloudrock/table/ActionButton';

interface ServiceProviderRegisterButtonProps extends TranslateProps {
  registering: boolean;
  loading: boolean;
  serviceProvider: ServiceProvider;
  canRegisterServiceProvider: boolean;
  registerServiceProvider?(): void;
}

export const ServiceProviderRegisterButton: FunctionComponent<ServiceProviderRegisterButtonProps> =
  (props) => {
    if (props.loading) {
      return <LoadingSpinner />;
    } else if (props.serviceProvider) {
      return (
        <>{`${props.translate('Registered at:')} ${formatDateTime(
          props.serviceProvider.created,
        )}`}</>
      );
    } else if (props.canRegisterServiceProvider) {
      return (
        <ActionButton
          title={props.translate('Register as service provider')}
          action={props.registerServiceProvider}
          className="btn btn-primary"
          icon={props.registering ? 'fa fa-spinner fa-spin' : undefined}
        />
      );
    } else {
      return <>{props.translate('Not a service provider.')}</>;
    }
  };
