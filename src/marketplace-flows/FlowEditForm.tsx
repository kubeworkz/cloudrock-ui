import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from 'react-use';
import { getFormValues, isValid, reduxForm } from 'redux-form';

import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { ShoppingCartUpdateButton } from '@cloudrock/marketplace/cart/ShoppingCartUpdateButton';
import { flattenAttributes } from '@cloudrock/marketplace/cart/store/effects';
import { getFlowOffering, getPlugins } from '@cloudrock/marketplace/common/api';
import { OfferingLogo } from '@cloudrock/marketplace/common/OfferingLogo';
import { FORM_ID } from '@cloudrock/marketplace/details/constants';
import {
  PureOfferingConfigurator,
  PureOfferingConfiguratorProps,
} from '@cloudrock/marketplace/details/OfferingConfigurator';
import { formatOrderItemForUpdate } from '@cloudrock/marketplace/details/utils';
import { ProviderLink } from '@cloudrock/marketplace/links/ProviderLink';
import { Plan } from '@cloudrock/marketplace/types';
import { useTitle } from '@cloudrock/navigation/title';
import { router } from '@cloudrock/router';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

import { getFlow, updateFlow } from './api';

async function loadData(itemId) {
  const flow = await getFlow(itemId);
  const offering = await getFlowOffering(flow.uuid);
  const plugins = await getPlugins();
  const limits = plugins.find(
    (plugin) => plugin.offering_type === offering.type,
  ).available_limits;
  let plan = {} as Plan;
  if (offering && flow.resource_create_request.plan_uuid) {
    plan = offering.plans.find(
      (offeringPlan) =>
        offeringPlan.uuid === flow.resource_create_request.plan_uuid,
    );
  }
  return { flow, offering, plan, limits };
}

const FlowUpdateForm = reduxForm<{}, PureOfferingConfiguratorProps>({
  form: FORM_ID,
})(PureOfferingConfigurator);

export const FlowEditForm = () => {
  useTitle(translate('Flow update'));

  const state = useAsync(
    () => loadData(router.globals.params.flow_uuid),
    [router.globals.params.flow_uuid],
  );
  const formData = useSelector(getFormValues(FORM_ID));
  const formValid = useSelector(isValid(FORM_ID));
  const dispatch = useDispatch();
  const updateItem = async () => {
    const {
      attributes,
      plan,
      limits,
      customer,
      customer_create_request,
      project_create_request,
    } = formatOrderItemForUpdate({ offering, formData });
    try {
      await updateFlow(router.globals.params.flow_uuid, {
        customer: customer?.url,
        customer_create_request,
        project_create_request,
        resource_create_request: {
          name: attributes.name,
          plan: plan?.url,
          attributes: flattenAttributes(attributes),
          limits,
        },
      });
      dispatch(showSuccess('Flow has been updated.'));
    } catch (e) {
      dispatch(showErrorResponse(e, 'Unable to update flow.'));
    }
  };

  if (state.loading) {
    return <LoadingSpinner />;
  }
  if (state.error) {
    return <>{translate('Unable to load flow.')}</>;
  }
  const { offering, plan, limits, flow } = state.value;
  return (
    <>
      {offering.description && (
        <div className="bs-callout bs-callout-success">
          <FormattedHtml html={offering.description} />
        </div>
      )}
      <Row>
        <Col md={9}>
          <FlowUpdateForm
            initialValues={{
              name: flow.resource_create_request.name,
              attributes: flow.resource_create_request.attributes,
              plan,
              project_create_request: flow.project_create_request,
              customer_create_request: flow.customer_create_request,
              customer: flow.customer
                ? { url: flow.customer, name: flow.customer_name }
                : undefined,
            }}
            offering={offering}
            limits={limits}
            plan={plan}
          />
        </Col>
        <Col md={3}>
          <h3 className="header-bottom-border">{translate('Summary')}</h3>
          <OfferingLogo src={offering.thumbnail} size="small" />
          <table className="table offering-details-section-table">
            <tbody>
              <tr>
                <td>
                  <strong>{translate('Offering')}</strong>
                </td>
                <td>{offering.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>{translate('Service provider')}</strong>
                </td>
                <td>
                  <ProviderLink customer_uuid={offering.customer_uuid}>
                    {offering.customer_name}
                  </ProviderLink>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="display-flex justify-content-between">
            <ShoppingCartUpdateButton
              updateItem={updateItem}
              flavor="primary"
              disabled={!formValid}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
