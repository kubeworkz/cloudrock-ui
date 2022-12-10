import { useRouter } from '@uirouter/react';
import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { Customer } from '@cloudrock/workspace/types';

interface OrganizationEditButtonProps {
  customer: Customer;
}

export const OrganizationEditButton: FunctionComponent<OrganizationEditButtonProps> =
  (props) => {
    const router = useRouter();
    return (
      <ActionButton
        title={translate('Edit')}
        icon="fa fa-edit"
        action={() =>
          router.stateService.go('support.customer-update', {
            customer_uuid: props.customer.uuid,
          })
        }
      />
    );
  };
