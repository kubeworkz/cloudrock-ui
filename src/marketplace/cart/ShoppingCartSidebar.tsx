import { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { DownloadLink } from '@cloudrock/core/DownloadLink';
import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { translate } from '@cloudrock/i18n';
import { getActiveFixedPricePaymentProfile } from '@cloudrock/invoices/details/utils';
import { isVisible } from '@cloudrock/store/config';
import { RootState } from '@cloudrock/store/reducers';
import { getCustomer, getProject } from '@cloudrock/workspace/selectors';
import { Customer, Project } from '@cloudrock/workspace/types';

import './ShoppingCartSidebar.scss';
import { getTotal } from './store/selectors';

interface ShoppingCartSidebarProps {
  total: number;
  file?: string;
  customer: Customer;
  project: Project;
  shouldConcealPrices: boolean;
}

export const PureShoppingCartSidebar: FunctionComponent<ShoppingCartSidebarProps> =
  (props) =>
    props.customer ? (
      <aside className="shopping-cart-sidebar">
        <div className="shopping-cart-sidebar-title">
          {translate('Order Summary')}
        </div>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <strong>{translate('Invoiced to')}</strong>
              </td>
              <td>{props.customer.name}</td>
            </tr>
            {props.project && (
              <tr>
                <td>
                  <strong>{translate('Project')}</strong>
                </td>
                <td>{props.project.name}</td>
              </tr>
            )}
            {!getActiveFixedPricePaymentProfile(
              props.customer.payment_profiles,
            ) && !props.shouldConcealPrices ? (
              <tr>
                <td className="text-lg">{translate('Total')}</td>
                <td className="text-lg">{defaultCurrency(props.total)}</td>
              </tr>
            ) : null}
          </tbody>
        </table>

        {props.file && (
          <DownloadLink
            label={translate('Download order PDF file')}
            url={props.file}
            filename="marketplace-order.pdf"
            className="btn btn-outline btn-default"
          />
        )}
      </aside>
    ) : null;

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
  project: getProject(state),
  total: getTotal(state),
  shouldConcealPrices: isVisible(state, 'marketplace.conceal_prices'),
});

export const ShoppingCartSidebar = connect(mapStateToProps)(
  PureShoppingCartSidebar,
);
