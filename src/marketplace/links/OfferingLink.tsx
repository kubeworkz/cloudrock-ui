import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from '@cloudrock/core/Link';
import { RootState } from '@cloudrock/store/reducers';
import { getWorkspace } from '@cloudrock/workspace/selectors';

import { WORKSPACE_OFFERING_DETAILS } from '../constants';

interface OwnProps {
  offering_uuid: string;
  className?: string;
}

const stateSelector = (state: RootState) => {
  const workspace = getWorkspace(state);
  return WORKSPACE_OFFERING_DETAILS[workspace];
};

export const OfferingLink: React.FC<OwnProps> = (props) => {
  const state = useSelector(stateSelector);
  return (
    <Link
      state={state}
      params={{ offering_uuid: props.offering_uuid }}
      className={props.className}
    >
      {props.children}
    </Link>
  );
};
