import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { UserDetails } from '@cloudrock/workspace/types';

import * as actions from './actions';

interface UserDetailsButtonProps extends TranslateProps {
  row: UserDetails;
  onClick: () => void;
}

const PureUserDetailsButton: FunctionComponent<UserDetailsButtonProps> = (
  props,
) => (
  <ActionButton
    title={props.translate('Details')}
    action={props.onClick}
    icon="fa fa-icon-info-sign"
  />
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (e) => {
    e.target.blur();
    return dispatch(actions.showUserDetails(ownProps.row));
  },
});

const enhance = compose(connect(null, mapDispatchToProps), withTranslation);

export const UserDetailsButton = enhance(PureUserDetailsButton);
