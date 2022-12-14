import { useMemo, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { getUser } from '@cloudrock/workspace/selectors';

import { getShowAllTypes, getIssueTypes } from '../types/utils';

import { LayoutWrapper } from './LayoutWrapper';
import { TypeField } from './TypeField';

export const TypeGroup: FunctionComponent<{ disabled; layout }> = ({
  disabled,
  layout,
}) => {
  const user = useSelector(getUser);
  const showAllTypes = getShowAllTypes(user);
  const issueTypes = useMemo(() => getIssueTypes(showAllTypes), [showAllTypes]);
  return (
    <LayoutWrapper
      layout={layout}
      header={
        <>
          {translate('Request type')}
          <span className="text-danger">*</span>
        </>
      }
      body={<TypeField issueTypes={issueTypes} isDisabled={disabled} />}
    />
  );
};
