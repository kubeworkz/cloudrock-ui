import { useAsync } from 'react-use';

import { get } from '@cloudrock/core/api';
import { formatFilesize } from '@cloudrock/core/utils';
import { withTranslation, TranslateProps } from '@cloudrock/i18n';
import { OrderItemDetailsField } from '@cloudrock/marketplace/orders/item/details/OrderItemDetailsField';
import { OrderItemResponse } from '@cloudrock/marketplace/orders/types';

import { formatVolumeTypeLabel } from '../openstack-instance/utils';
import { VolumeType } from '../types';

const formatSize = (props) => {
  return formatFilesize(props.orderItem.attributes.size);
};

export interface OpenstackVolumeDetailsProps extends TranslateProps {
  orderItem: OrderItemResponse;
}

const PureOpenstackVolumeDetails = (props: OpenstackVolumeDetailsProps) => {
  const { translate, orderItem } = props;
  const { value: volumeType } = useAsync(() =>
    orderItem.attributes.type
      ? get<VolumeType>(orderItem.attributes.type).then(
          (response) => response.data,
        )
      : Promise.resolve(null),
  );
  return (
    <>
      <OrderItemDetailsField label={translate('Size')}>
        {formatSize(props)}
      </OrderItemDetailsField>
      {orderItem.attributes.availability_zone_name && (
        <OrderItemDetailsField label={translate('Availability zone')}>
          {orderItem.attributes.availability_zone_name}
        </OrderItemDetailsField>
      )}
      {volumeType && (
        <OrderItemDetailsField label={translate('Volume type')}>
          {formatVolumeTypeLabel(volumeType)}
        </OrderItemDetailsField>
      )}
    </>
  );
};

export const OpenstackVolumeDetails = withTranslation(
  PureOpenstackVolumeDetails,
);
