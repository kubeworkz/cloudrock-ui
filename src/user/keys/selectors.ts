import { getUser } from '@cloudrock/issues/comments/selectors';
import { RootState } from '@cloudrock/store/reducers';
import { isStaff } from '@cloudrock/workspace/selectors';

export const isStaffOrSelfSelectorCreator =
  (stateParams) => (state: RootState) =>
    stateParams.uuid === undefined ||
    stateParams.uuid === getUser(state)?.uuid ||
    isStaff(state);
