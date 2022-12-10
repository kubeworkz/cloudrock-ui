import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const CustomerPopover = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CustomerPopover" */ '@cloudrock/customer/popover/CustomerPopover'
    ),
  'CustomerPopover',
);

export const IssueOrganization = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <a
      onClick={() =>
        dispatch(
          openModalDialog(CustomerPopover, {
            resolve: { customer_uuid: item.customer_uuid },
            size: 'lg',
          }),
        )
      }
    >
      {item.customer_name}
    </a>
  );
};
