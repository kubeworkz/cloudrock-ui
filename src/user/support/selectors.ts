import { ENV } from '@cloudrock/configs/default';
import { isVisible } from '@cloudrock/store/config';
import { RootState } from '@cloudrock/store/reducers';
import { getUser } from '@cloudrock/workspace/selectors';

export const userManageIsVisible = (state: RootState) => {
  if (!isVisible(state, 'support.user_manage')) {
    return false;
  }
  const user = getUser(state);
  return user.is_staff;
};

export const userTokenIsVisible = (state: RootState, ownProps) => {
  const currentUser = getUser(state);
  if (!currentUser) {
    return false;
  }
  if (currentUser.uuid !== ownProps.user.uuid) {
    return false;
  }
  return ownProps.user.token && !ownProps.initial;
};

export const fieldIsVisible = (ownProps) => (field: string) => {
  if (!ownProps.initial) {
    return true;
  }

  return !ENV.plugins.CLOUDROCK_CORE.USER_REGISTRATION_HIDDEN_FIELDS.includes(
    field,
  );
};

export const isRequired = (field: string) => {
  return ENV.plugins.CLOUDROCK_CORE.USER_MANDATORY_FIELDS.includes(field);
};

export const isVisibleForSupportOrStaff = (state: RootState) => {
  const user = getUser(state);
  return user && (user.is_support || user.is_staff);
};

export const userLanguageIsVisible = (state: RootState) =>
  isVisible(state, 'user.preferred_language');

export const userCompetenceIsVisible = (state: RootState) =>
  isVisible(state, 'user.competence');
