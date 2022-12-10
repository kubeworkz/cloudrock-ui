import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { UserAutocomplete } from '@cloudrock/issues/feedback/UserAutocomplete';
import { EventDateFilter } from '@cloudrock/support/EventDateFilter';
import { EventGroupFilter } from '@cloudrock/support/EventGroupFilter';

import { SUPPORT_EVENTS_LIST_FILTER_FORM_ID } from './constants';

const PureSupportEventsListFilter: FunctionComponent = () => (
  <div className="m-b-md">
    <Row>
      <Col sm={4}>
        <EventGroupFilter />
      </Col>
      <Col sm={4}>
        <div>
          <label className="control-label">{translate('Date')}</label>
          <EventDateFilter />
        </div>
      </Col>
      <Col sm={4}>
        <div>
          <label className="control-label">{translate('User')}</label>
          <UserAutocomplete />
        </div>
      </Col>
    </Row>
  </div>
);

const enhance = reduxForm({
  form: SUPPORT_EVENTS_LIST_FILTER_FORM_ID,
});

export const SupportEventsListFilter = enhance(PureSupportEventsListFilter);
