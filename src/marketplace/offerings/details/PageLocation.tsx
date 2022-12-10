import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { LocationContainer } from '@cloudrock/map/LocationContainer';
import { updateProviderOffering } from '@cloudrock/marketplace/common/api';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { showError, showSuccess } from '@cloudrock/store/notify';

export const PageLocation = connect<{}, {}, { offering }>((_, props) => ({
  initialValues: {
    location: {
      latitude: props.offering.latitude,
      longitude: props.offering.longitude,
    },
  },
}))(
  reduxForm<{}, any>({
    form: 'PublicOfferingLocationEditor',
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
      const updateOfferingHandler = async ({ location }) => {
        try {
          await updateProviderOffering(offering.uuid, location);
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
              <i className="fa fa-arrow-left"></i> {translate('Location')}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Field
              name="location"
              component={LocationContainer}
              label={translate('Location of {offeringName} offering', {
                offeringName: offering.name,
              })}
            />
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
