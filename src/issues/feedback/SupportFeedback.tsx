import { triggerTransition } from '@uirouter/redux';
import ReactStars from 'react-rating-stars-component';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { FormContainer, SubmitButton, TextField } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { addFeedback } from '@cloudrock/issues/feedback/api';
import { SUPPORT_FEEDBACK_FORM_ID } from '@cloudrock/issues/feedback/constants';
import { useTitle } from '@cloudrock/navigation/title';
import { router } from '@cloudrock/router';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

import './SupportFeedback.scss';
import { useSupport } from '../hooks';

const SupportFeedbackContainer = (props) => {
  useTitle(translate('Feedback'));
  const dispatch = useDispatch();
  useSupport();

  const submitRequest = async (formData) => {
    try {
      await addFeedback({
        ...formData,
        token: router.globals.params.token,
      });
      dispatch(showSuccess(translate('Thank you for your response!')));
      dispatch(triggerTransition('login', {}));
    } catch (error) {
      dispatch(showErrorResponse(error, translate('Unable to send feedback.')));
    }
  };

  return (
    <>
      <form
        onSubmit={props.handleSubmit(submitRequest)}
        className="form-horizontal center-vertically"
      >
        <FormContainer
          submitting={props.submitting}
          labelClass="col-sm-2"
          controlClass="col-sm-8"
        >
          <Field
            name="evaluation"
            label={translate('Evaluation')}
            component={(fieldProps) => (
              <ReactStars
                count={10}
                size={24}
                edit={true}
                isHalf={false}
                activeColor="#ffd700"
                value={fieldProps.input.value}
                onChange={(value) => fieldProps.input.onChange(value)}
              />
            )}
          />

          <TextField
            name="comment"
            label={translate('Comment')}
            maxLength={150}
            rows={2}
          />

          <div className="form-group">
            <div
              className="col-sm-8 col-sm-offset-2"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <SubmitButton
                disabled={props.invalid}
                submitting={props.submitting}
                label={translate('Submit')}
              />
            </div>
          </div>
        </FormContainer>
      </form>
    </>
  );
};

const mapStateToProps = () => ({
  initialValues: {
    evaluation: parseInt(router.globals.params?.evaluation || 0, 10),
  },
});

const connector = connect(mapStateToProps);

const enhance = compose(
  connector,
  reduxForm({
    form: SUPPORT_FEEDBACK_FORM_ID,
  }),
);

export const SupportFeedback = enhance(SupportFeedbackContainer);
