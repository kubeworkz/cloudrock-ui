import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from '@cloudrock/core/Link';
import { WORKSPACE_CATEGORY } from '@cloudrock/marketplace/constants';
import { RootState } from '@cloudrock/store/reducers';
import { getWorkspace } from '@cloudrock/workspace/selectors';

interface OwnProps {
  category_uuid: string;
  className?: string;
}

const stateSelector = (state: RootState) => {
  const workspace = getWorkspace(state);
  return WORKSPACE_CATEGORY[workspace];
};

export const CategoryLink: React.FC<OwnProps> = (props) => {
  const state = useSelector(stateSelector);
  return (
    <Link
      state={state}
      params={{ category_uuid: props.category_uuid }}
      className={props.className}
    >
      {props.children}
    </Link>
  );
};
