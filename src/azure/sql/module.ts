import { lazyComponent } from '@cloudrock/core/lazyComponent';
import './marketplace';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import './actions';
import './tabs';

const AzureSQLDatabaseSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AzureSQLDatabaseSummary" */ './AzureSQLDatabaseSummary'
    ),
  'AzureSQLDatabaseSummary',
);
const AzureSQLServerSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AzureSQLServerSummary" */ './AzureSQLServerSummary'
    ),
  'AzureSQLServerSummary',
);

ResourceSummary.register('Azure.SQLServer', AzureSQLServerSummary);
ResourceSummary.register('Azure.SQLDatabase', AzureSQLDatabaseSummary);
