import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { CustomerSupportRating } from '@cloudrock/issues/CustomerSupportRating';
import { IssuesList } from '@cloudrock/issues/list/IssuesList';
import { useTitle } from '@cloudrock/navigation/title';
import { isStaffOrSupport as isStaffOrSupportSelector } from '@cloudrock/workspace/selectors';

import { useSupport } from './hooks';

export const SupportIssues: FunctionComponent = () => {
  useTitle(translate('Issues'));
  const isStaffOrSupport = useSelector(isStaffOrSupportSelector);
  useSupport();
  return (
    <>
      {isStaffOrSupport && <CustomerSupportRating />}
      <Panel>
        <IssuesList />
      </Panel>
    </>
  );
};
