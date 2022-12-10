import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';
import { isStaffOrSupport } from '@cloudrock/workspace/selectors';

import { ExpandableEventDetailsTable } from './ExpandableEventDetailsTable';
import { Event } from './types';

interface StateProps {
  isStaffOrSupport: boolean;
}

interface ExpandableEventDetailsProps extends TranslateProps, StateProps {
  row: Event;
}

const PureExpandableEventDetails: FunctionComponent<ExpandableEventDetailsProps> =
  (props) => (
    <ExpandableEventDetailsTable
      event={props.row}
      translate={props.translate}
      isStaffOrSupport={props.isStaffOrSupport}
    />
  );

const mapStateToProps = (state: RootState) => ({
  isStaffOrSupport: isStaffOrSupport(state),
});

const enhance = compose(connect<StateProps>(mapStateToProps), withTranslation);

export const ExpandableEventDetails = enhance(PureExpandableEventDetails);
