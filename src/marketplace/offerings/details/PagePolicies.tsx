import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Col,
  Row,
} from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { useAsync } from 'react-use';
import { reduxForm } from 'redux-form';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import {
  getAllOrganizationDivisions,
  updateProviderOfferingAccessPolicy,
} from '@cloudrock/marketplace/common/api';
import { SetAccessPolicyFormContainer } from '@cloudrock/marketplace/offerings/actions/SetAccessPolicyFormContainer';
import {
  formatRequestBodyForSetAccessPolicyForm,
  getInitialValuesForSetAccessPolicyForm,
} from '@cloudrock/marketplace/offerings/actions/utils';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { showError, showSuccess } from '@cloudrock/store/notify';

export const PagePolicies = connect<{}, {}, { offering }>((_, props) => ({
  initialValues: getInitialValuesForSetAccessPolicyForm(
    props.offering.divisions,
  ),
}))(
  reduxForm<{}, any>({
    form: 'PublicOfferingAccessPolicyEditor',
  })(
    ({
      submitting,
      handleSubmit,
      invalid,
      onReturn,
      refreshOffering,
      offering,
    }) => {
      const dispatch = useDispatch();
      const {
        loading,
        error,
        value: divisions,
      } = useAsync(async () => await getAllOrganizationDivisions(), [offering]);
      const updateOfferingHandler = async (formData) => {
        try {
          await updateProviderOfferingAccessPolicy(
            offering.uuid,
            formatRequestBodyForSetAccessPolicyForm(formData, divisions),
          );
          await refreshOffering();
          dispatch(showSuccess(translate('Offering has been updated.')));
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(showError(translate('Unable to update offering.')));
        }
      };
      return (
        <form onSubmit={handleSubmit(updateOfferingHandler)}>
          <ModalHeader onClick={onReturn} style={{ cursor: 'pointer' }}>
            <ModalTitle>
              <i className="fa fa-arrow-left"></i> {translate('Access policy')}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col lg={12}>
                {loading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <>{translate('Unable to load divisions.')}</>
                ) : (
                  <SetAccessPolicyFormContainer
                    divisions={divisions}
                    submitting={submitting}
                    layout="vertical"
                  />
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <SubmitButton
              disabled={invalid}
              submitting={submitting}
              label={translate('Update')}
            />
          </ModalFooter>
        </form>
      );
    },
  ),
);
