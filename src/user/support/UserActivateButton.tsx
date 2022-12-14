import { connect } from 'react-redux';
import { compose } from 'redux';

import { Tooltip } from '@cloudrock/core/Tooltip';
import { TranslateProps, withTranslation, translate } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { getUser } from '@cloudrock/workspace/selectors';
import { UserDetails, User } from '@cloudrock/workspace/types';

import * as actions from './actions';

interface UserActivateButtonProps extends TranslateProps {
  user: User;
  row: UserDetails;
  onClick: () => void;
}

const PureUserActivateButton = (props: UserActivateButtonProps) =>
  props.user.is_staff ? (
    <Tooltip
      id="user-activate"
      label={
        props.row.is_active
          ? translate(
              'Inactive user will not be able to login into the portal.',
            )
          : translate('Active user will be able to login into the portal.')
      }
    >
      <ActionButton
        title={
          props.row.is_active
            ? props.translate('Deactivate')
            : props.translate('Activate')
        }
        action={props.onClick}
      />
    </Tooltip>
  ) : null;

const mapStatToProps = (state: RootState) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (e) => {
    e.target.blur();
    if (ownProps.row.is_active) {
      return actions.deactivateUser(ownProps.row, dispatch);
    } else {
      return actions.activateUser(ownProps.row, dispatch);
    }
  },
});

const enhance = compose(
  connect(mapStatToProps, mapDispatchToProps),
  withTranslation,
);

export const UserActivateButton = enhance(PureUserActivateButton);
