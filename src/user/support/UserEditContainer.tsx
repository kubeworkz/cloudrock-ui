import React from 'react';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { ENV } from '@cloudrock/configs/default';
import { formatJsxTemplate, translate, withTranslation } from '@cloudrock/i18n';
import { getNativeNameVisible, getConfig } from '@cloudrock/store/config';
import {
  fieldIsVisible,
  isRequired,
  isVisibleForSupportOrStaff,
  userTokenIsVisible,
} from '@cloudrock/user/support/selectors';
import { UserEditForm } from '@cloudrock/user/support/UserEditForm';
import { UserDetails } from '@cloudrock/workspace/types';

import '../user-edit.scss';
import * as actions from './actions';
import { EmailChangeForm } from './EmailChangeForm';

interface UserUpdateComponentProps {
  showDeleteButton: boolean;
  user: UserDetails;
}

const UserUpdateComponent: React.FC<UserUpdateComponentProps> = (props) => {
  if (!props.user.email) {
    return <EmailChangeForm user={props.user} />;
  }
  return (
    <div className="row">
      <div className="col-sm-2 col-xs-12 user-edit">
        <div className="logo">
          <div className="img-wrapper">
            <Gravatar email={props.user.email} size={100} />
          </div>
          <span className="manage-gravatar">
            {translate(
              'Manage avatar at {link}',
              {
                link: (
                  <>
                    <br />
                    <a
                      href="https://gravatar.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      gravatar.com
                    </a>
                  </>
                ),
              },
              formatJsxTemplate,
            )}
          </span>
        </div>
      </div>
      <UserEditForm {...props} />
    </div>
  );
};

UserUpdateComponent.defaultProps = {
  showDeleteButton: true,
};

const getProtectedMethods = (state: any): string[] => {
  const plugins = getConfig(state).plugins;
  return (
    plugins.CLOUDROCK_CORE.PROTECT_USER_DETAILS_FOR_REGISTRATION_METHODS || []
  );
};

const mapStateToProps = (state, ownProps) => ({
  isVisibleForSupportOrStaff: isVisibleForSupportOrStaff(state),
  initialValues: ownProps.user,
  userTokenIsVisible: userTokenIsVisible(state, ownProps),
  fieldIsVisible: fieldIsVisible(ownProps),
  isRequired,
  nativeNameIsVisible: getNativeNameVisible(state),
  protected: getProtectedMethods(state).includes(
    ownProps.user.registration_method,
  ),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  let updateUser;
  if (ownProps.onSave) {
    updateUser = (data) =>
      ownProps.onSave({
        ...data,
        agree_with_policy: true,
      });
  } else {
    updateUser = (data) =>
      actions.updateUser(
        {
          ...data,
          uuid: ownProps.user.uuid,
          agree_with_policy: true,
        },
        dispatch,
      );
  }

  return {
    updateUser,
    dispatchRemoval: () => dispatch(actions.showUserRemoval()),
    dispatchMessage: (resolve) =>
      dispatch(actions.showUserRemovalMessage(resolve)),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { user } = ownProps;
  const { dispatchRemoval, dispatchMessage } = dispatchProps;
  let showUserRemoval;

  if (ENV.plugins.CLOUDROCK_SUPPORT) {
    showUserRemoval = dispatchRemoval;
  } else {
    showUserRemoval = () =>
      dispatchMessage({
        supportEmail: ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL,
        userName: user.full_name,
      });
  }

  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    showUserRemoval,
  };
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  withTranslation,
);

export const UserEditContainer = enhance(UserUpdateComponent);
