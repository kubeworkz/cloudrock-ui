import { lazyComponent } from '@cloudrock/core/lazyComponent';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import './help';
import './provider';
const DigitalOceanDropletSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "DigitalOceanDropletSummary" */ './DigitalOceanDropletSummary'
    ),
  'DigitalOceanDropletSummary',
);

ResourceSummary.register('DigitalOcean.Droplet', DigitalOceanDropletSummary);
