import { isFeatureVisible } from '@cloudrock/features/connect';
import { ISSUE_IDS, getIssueTypeChoices } from '@cloudrock/issues/types/constants';
import { User } from '@cloudrock/workspace/types';

export function getShowAllTypes(user: User) {
  return (
    !isFeatureVisible('support.conceal_change_request') ||
    user.is_staff ||
    user.is_support
  );
}

export function getIssueTypes(showAllTypes: boolean) {
  return showAllTypes
    ? getIssueTypeChoices()
    : getIssueTypeChoices().filter((x) => x.id !== ISSUE_IDS.CHANGE_REQUEST);
}
