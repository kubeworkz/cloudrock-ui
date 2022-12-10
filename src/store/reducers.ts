import { routerReducer } from '@uirouter/redux';
import { reducer as notificationsReducer } from 'reapop';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as bookings } from '@cloudrock/booking/store/reducer';
import { reducer as downloadLink } from '@cloudrock/core/DownloadLink/reducers';
import { reducer as issues } from '@cloudrock/issues/reducers';
import { reducer as marketplace } from '@cloudrock/marketplace/store/reducers';
import { reducer as modal } from '@cloudrock/modal/reducer';
import { reducer as breadcrumbs } from '@cloudrock/navigation/breadcrumbs/store';
import { reducer as sidebar } from '@cloudrock/navigation/sidebar/reducers';
import { reducer as title } from '@cloudrock/navigation/title';
import { reducer as serviceUsage } from '@cloudrock/providers/support/reducers';
import { reducer as resource } from '@cloudrock/resource/reducers';
import { reducer as tables } from '@cloudrock/table/store';
import { reducer as workspace } from '@cloudrock/workspace/reducers';

import { reducer as config } from './config';
import { reducer as locale } from './locale';

export const rootReducer = combineReducers({
  form: formReducer,
  notifications: notificationsReducer(),
  router: routerReducer,
  config,
  modal,
  tables,
  issues,
  workspace,
  locale,
  downloadLink,
  resource,
  serviceUsage,
  marketplace,
  bookings,
  title,
  breadcrumbs,
  sidebar,
});

export type RootState = ReturnType<typeof rootReducer>;
