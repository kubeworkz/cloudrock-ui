import { ENV } from '@cloudrock/configs/default';
import { destroyNode } from '@cloudrock/rancher/api';
import { validateState } from '@cloudrock/resource/actions/base';
import { DestroyActionItem } from '@cloudrock/resource/actions/DestroyActionItem';

const validators = [validateState('OK', 'Erred')];

export const DestroyAction = ({ resource }) =>
  !ENV.plugins.CLOUDROCK_RANCHER.READ_ONLY_MODE ? (
    <DestroyActionItem
      validators={validators}
      resource={resource}
      apiMethod={destroyNode}
    />
  ) : null;
