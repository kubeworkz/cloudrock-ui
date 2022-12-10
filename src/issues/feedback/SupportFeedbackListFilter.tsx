import { Col, Row } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import { makeLastTwelveMonthsFilterPeriods } from '@cloudrock/form/utils';
import { SUPPORT_FEEDBACK_LIST_FILTER_FORM } from '@cloudrock/issues/feedback/constants';
import { EvaluationSelectField } from '@cloudrock/issues/feedback/EvaluationSelectField';
import { PeriodFilterField } from '@cloudrock/issues/feedback/PeriodFilterField';
import { UserAutocomplete } from '@cloudrock/issues/feedback/UserAutocomplete';

export const PureSupportFeedbackListFilter = () => (
  <div className="ibox">
    <div className="ibox-content m-b-sm border-bottom">
      <form className="form-inline">
        <Row>
          <Col sm={4}>
            <PeriodFilterField options={makeLastTwelveMonthsFilterPeriods()} />
          </Col>
          <Col sm={4}>
            <EvaluationSelectField />
          </Col>
          <Col sm={4}>
            <UserAutocomplete />
          </Col>
        </Row>
      </form>
    </div>
  </div>
);

export const SupportFeedbackListFilter = reduxForm({
  form: SUPPORT_FEEDBACK_LIST_FILTER_FORM,
  initialValues: {
    period: makeLastTwelveMonthsFilterPeriods()[0],
  },
})(PureSupportFeedbackListFilter);
