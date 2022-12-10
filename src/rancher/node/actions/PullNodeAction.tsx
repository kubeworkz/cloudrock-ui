import { useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';
import { getUser } from '@cloudrock/workspace/selectors';

import { pullNode } from '../../api';

export const PullNodeAction = ({ resource }) => {
  const user = useSelector(getUser);
  if (user.is_staff || !ENV.plugins.CLOUDROCK_RANCHER.READ_ONLY_MODE)
    return <PullActionItem apiMethod={pullNode} resource={resource} />;
  return null;
};
