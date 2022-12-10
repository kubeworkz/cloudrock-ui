import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { RootState } from '@cloudrock/store/reducers';
import { isStaffOrSupport } from '@cloudrock/workspace/selectors';

import { EventDetailsTable } from './EventDetailsTable';
import { Event } from './types';

interface StateProps {
  isStaffOrSupport: boolean;
}

interface EventDetailsDialogProps extends TranslateProps, StateProps {
  resolve: { event: Event };
}

const PureEventDetailsDialog: FunctionComponent<EventDetailsDialogProps> = (
  props,
) => (
  <ModalDialog
    title={props.translate('Event details')}
    footer={<CloseDialogButton />}
  >
    <EventDetailsTable
      event={props.resolve.event}
      translate={props.translate}
      isStaffOrSupport={props.isStaffOrSupport}
    />
  </ModalDialog>
);

const mapStateToProps = (state: RootState) => ({
  isStaffOrSupport: isStaffOrSupport(state),
});

const enhance = compose(connect<StateProps>(mapStateToProps), withTranslation);

export const EventDetailsDialog = enhance(PureEventDetailsDialog);
