import { FunctionComponent, useContext } from 'react';
import { Col, FormGroup, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { WrappedFieldArrayProps } from 'redux-form';

import { CalendarComponent } from '@cloudrock/booking/components/calendar/CalendarComponent';
import { CalendarSettings } from '@cloudrock/booking/components/CalendarSettings';
import { getConfig } from '@cloudrock/booking/store/selectors';
import { BookingProps } from '@cloudrock/booking/types';
import { deleteCalendarBooking } from '@cloudrock/booking/utils';
import { FormLayoutContext } from '@cloudrock/form/context';
import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';

import './OfferingScheduler.scss';

import { getSchedules } from '../store/selectors';

type StateProps = ReturnType<typeof mapStateToProps>;

type OfferingSchedulerProps = TranslateProps &
  WrappedFieldArrayProps<BookingProps> &
  StateProps;

const PureOfferingScheduler: FunctionComponent<OfferingSchedulerProps> = (
  props,
) => {
  const { layout } = useContext(FormLayoutContext);

  const col = layout === 'vertical' ? 0 : 8;
  const offset = layout === 'vertical' ? 0 : 2;

  return (
    <FormGroup>
      <Col smOffset={offset} sm={col}>
        <Panel>
          <Panel.Heading>
            <h4>{props.translate('Availability')}</h4>
          </Panel.Heading>
          <Panel.Body>
            <CalendarSettings />
          </Panel.Body>
        </Panel>

        <CalendarComponent
          calendarType="create"
          events={props.fields.getAll() || []}
          addEventCb={props.fields.push}
          removeEventCb={(id) => deleteCalendarBooking(props.fields, { id })}
          options={props.config}
        />
      </Col>
    </FormGroup>
  );
};

const mapStateToProps = (state: RootState) => ({
  schedules: getSchedules(state),
  config: getConfig(state),
});

const enhance = compose(connect(mapStateToProps), withTranslation);

export const OfferingScheduler = enhance(PureOfferingScheduler);
