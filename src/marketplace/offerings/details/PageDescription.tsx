import { useEffect } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';

import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import {
  updateProviderOfferingAttributes,
  updateProviderOfferingDescription,
} from '@cloudrock/marketplace/common/api';
import { DescriptionUpdateContainer } from '@cloudrock/marketplace/offerings/create/DescriptionUpdateContainer';
import * as actions from '@cloudrock/marketplace/offerings/store/actions';
import { formatOfferingRequest } from '@cloudrock/marketplace/offerings/store/utils';
import { getInitialValues } from '@cloudrock/marketplace/offerings/update/utils';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';
import { RootState } from '@cloudrock/store/reducers';

export const PageDescription = connect((state: RootState) => ({
  initialValues: getInitialValues(state),
}))(
  reduxForm<{}, any>({
    form: 'PublicOfferingDescriptionEditor',
  })(
    ({
      submitting,
      handleSubmit,
      invalid,
      onReturn,
      refreshOffering,
      offering,
      category,
    }) => {
      const dispatch = useDispatch();
      const updateOfferingHandler = async (formData) => {
        try {
          const offeringRequest = formatOfferingRequest(formData, []);
          await updateProviderOfferingDescription(
            offering.uuid,
            offeringRequest.category,
          );
          await updateProviderOfferingAttributes(
            offering.uuid,
            offeringRequest.attributes,
          );
          await refreshOffering();
          dispatch(showSuccess(translate('Offering has been updated.')));
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(
            showErrorResponse(e, translate('Unable to update offering.')),
          );
        }
      };
      useEffect(() => {
        dispatch(actions.categoryChanged(category));
      }, [category]);
      return (
        <form onSubmit={handleSubmit(updateOfferingHandler)}>
          <ModalHeader onClick={onReturn} style={{ cursor: 'pointer' }}>
            <ModalTitle>
              <i className="fa fa-arrow-left"></i> {translate('Description')}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <DescriptionUpdateContainer />
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
