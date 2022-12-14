import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAsync } from 'react-use';
import { FieldArray, initialize, reduxForm } from 'redux-form';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import {
  getCategory,
  updateProviderOfferingAttributes,
} from '@cloudrock/marketplace/common/api';
import { isOfferingTypeSchedulable } from '@cloudrock/marketplace/common/registry';
import { Offering } from '@cloudrock/marketplace/types';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { updateEntity } from '@cloudrock/table/actions';

import { OfferingAttributes } from '../attributes/OfferingAttributes';
import { OfferingScheduler } from '../option/OfferingScheduler';
import { OFFERING_TABLE_NAME } from '../store/constants';
import { formatAttributes, formatSchedules } from '../store/utils';
import { parseAttributes } from '../update/utils';

interface OwnProps {
  resolve: { offering: Offering };
}

interface FormData {
  attributes: any;
  schedules: any;
}

const FORM_ID = 'UpdateOfferingAttributes';

export const UpdateOfferingAttributesDialog = reduxForm<FormData, OwnProps>({
  form: FORM_ID,
})(({ resolve: { offering }, handleSubmit, invalid, submitting }) => {
  const dispatch = useDispatch();

  const { loading, value: category } = useAsync(() =>
    getCategory(offering.category_uuid),
  );

  useEffect(() => {
    if (category) {
      const attributes = parseAttributes(category, offering.attributes);
      dispatch(
        initialize(FORM_ID, {
          attributes,
          schedules: offering.attributes?.schedules,
        }),
      );
    }
  }, [dispatch, category, offering]);

  const submitRequest = async (formData: FormData) => {
    const attributes: any = formatAttributes(category, formData.attributes);
    if (formData.schedules) {
      attributes.schedules = formatSchedules(formData.schedules);
    }
    try {
      await updateProviderOfferingAttributes(offering.uuid, attributes);
      dispatch(showSuccess(translate('Offering has been updated.')));
      dispatch(closeModalDialog());
      dispatch(
        updateEntity(OFFERING_TABLE_NAME, offering.uuid, {
          ...offering,
          attributes,
        }),
      );
    } catch (error) {
      dispatch(
        showErrorResponse(error, translate('Unable to update offering')),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(submitRequest)} className="form-horizontal">
      <Modal.Header>
        <Modal.Title>{translate('Edit offering')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <OfferingAttributes
              sections={category.sections}
              labelCols={2}
              controlCols={8}
            />
            {isOfferingTypeSchedulable(offering.type) && (
              <FieldArray name="schedules" component={OfferingScheduler} />
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <CloseDialogButton />
        <SubmitButton
          disabled={invalid}
          submitting={submitting}
          label={translate('Submit')}
        />
      </Modal.Footer>
    </form>
  );
});
