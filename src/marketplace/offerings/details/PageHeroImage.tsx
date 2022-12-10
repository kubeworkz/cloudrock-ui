import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
  Col,
} from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';

import { FormContainer, SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { uploadOfferingHeroImage } from '@cloudrock/marketplace/common/api';
import { ImageUploadField } from '@cloudrock/marketplace/offerings/create/ImageUploadField';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { showError, showSuccess } from '@cloudrock/store/notify';

export const PageHeroImage = connect<{}, {}, { offering }>((_, props) => ({
  initialValues: {
    images: props.offering.image,
  },
}))(
  reduxForm<{}, any>({
    form: 'PublicOfferingHeroImageEditor',
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
      const updateOfferingHandler = async (formData) => {
        try {
          if (formData.images instanceof File || formData.images === '') {
            await uploadOfferingHeroImage(offering.uuid, formData.images);
          }
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
              <i className="fa fa-arrow-left"></i> {translate('Hero image')}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col lg={12}>
                <FormContainer
                  submitting={submitting}
                  labelClass="col-lg-12"
                  controlClass="col-lg-12"
                >
                  <ImageUploadField
                    name="images"
                    label={translate('Image: ')}
                    accept={'image/*'}
                    buttonLabel={translate('Browse')}
                    required={true}
                  />
                </FormContainer>
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
