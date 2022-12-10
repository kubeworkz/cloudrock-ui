import { lazyComponent } from '@cloudrock/core/lazyComponent';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';
import { ResourceSummaryBase } from '@cloudrock/resource/summary/ResourceSummaryBase';

const SlurmAllocationSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SlurmAllocationSummary" */ './SlurmAllocationSummary'
    ),
  'SlurmAllocationSummary',
);

ResourceSummary.register('SLURM.Allocation', SlurmAllocationSummary, false);
ResourceSummary.register('SLURM.Job', ResourceSummaryBase);
