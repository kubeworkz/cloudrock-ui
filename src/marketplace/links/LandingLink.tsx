import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Link } from '@cloudrock/core/Link';
import { getWorkspace } from '@cloudrock/workspace/selectors';

import { WORKSPACE_LANDING } from '../constants';

export const LandingLink: FunctionComponent = (props) => {
  const workspace = useSelector(getWorkspace);
  const state = WORKSPACE_LANDING[workspace];
  return <Link state={state}>{props.children}</Link>;
};
