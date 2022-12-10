import { TerminateAction } from '@cloudrock/marketplace/resources/terminate/TerminateAction';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';

import { DetailsAction } from './DetailsAction';
import { EditAction } from './EditAction';
import { PullAllocationAction } from './PullAllocationAction';
import { RequestLimitsChangeAction } from './RequestLimitsChangeAction';
import { SetLimitsAction } from './SetLimitsAction';

ActionRegistry.register('SLURM.Allocation', [
  DetailsAction,
  PullAllocationAction,
  EditAction,
  SetLimitsAction,
  TerminateAction,
  RequestLimitsChangeAction,
]);
