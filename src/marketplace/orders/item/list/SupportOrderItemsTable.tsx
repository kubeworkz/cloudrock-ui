import { FunctionComponent } from 'react';
import { Table } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';
import { OrderItemStateCell } from '@cloudrock/marketplace/orders/item/list/OrderItemStateCell';
import { OrderItemTypeCell } from '@cloudrock/marketplace/orders/item/list/OrderItemTypeCell';
import { ResourceNameField } from '@cloudrock/marketplace/orders/item/list/ResourceNameField';
import { RowNameField } from '@cloudrock/marketplace/orders/item/list/RowNameField';
import { SupportOrderItemApproveButton } from '@cloudrock/marketplace/orders/item/list/SupportOrderItemApproveButton';
import { SupportOrderItemRejectButton } from '@cloudrock/marketplace/orders/item/list/SupportOrderItemRejectButton';
import { Field } from '@cloudrock/resource/summary';
import { renderFieldOrDash } from '@cloudrock/table/utils';

export const SupportOrderItemsTable: FunctionComponent<{ order }> = ({
  order,
}) => (
  <>
    <dl className="dl-horizontal">
      <Field
        label={translate('Project description')}
        value={order.project_description}
      />
    </dl>
    {order.items.length ? (
      <Table>
        <thead>
          <tr>
            <th>{translate('Offering')}</th>
            <th>{translate('Resource')}</th>
            <th>{translate('Type')}</th>
            <th>{translate('State')}</th>
            <th>{translate('Plan')}</th>
            <th>{translate('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index: number) => (
            <tr key={index}>
              <td>{<RowNameField row={item} order={order} />}</td>
              <td>{<ResourceNameField row={item} />}</td>
              <td>{<OrderItemTypeCell row={item} />}</td>
              <td>{<OrderItemStateCell row={item} />}</td>
              <td>{renderFieldOrDash(item.plan_name)}</td>
              <td>
                {item.state === 'done' ? null : (
                  <>
                    {item.state === 'executing' && (
                      <SupportOrderItemApproveButton
                        itemUuid={item.uuid}
                        orderUuid={order.uuid}
                      />
                    )}
                    {item.state !== 'terminated' &&
                      item.state !== 'terminating' && (
                        <SupportOrderItemRejectButton
                          itemUuid={item.uuid}
                          orderUuid={order.uuid}
                        />
                      )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <p>{translate("Order doesn't have items")}</p>
    )}
  </>
);
