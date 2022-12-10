import * as Sentry from '@sentry/react';
import ReactGA from 'react-ga';

import { initAuthToken } from './auth/interceptor';
import { ENV } from './configs/default';
import { LanguageUtilsService } from './i18n/LanguageUtilsService';
import loadInspinia from './inspinia';
import { initConfig } from './store/config';
import store from './store/store';
import { attachTransitions } from './transitions';

export function afterBootstrap() {
  document.title = ENV.plugins.CLOUDROCK_CORE.FULL_PAGE_TITLE;
  if (ENV.plugins.CLOUDROCK_CORE.GOOGLE_ANALYTICS_ID) {
    ReactGA.initialize(ENV.plugins.CLOUDROCK_CORE.GOOGLE_ANALYTICS_ID);
  }
  if (ENV.plugins.CLOUDROCK_CORE.HOMEPORT_SENTRY_DSN) {
    Sentry.init({
      dsn: ENV.plugins.CLOUDROCK_CORE.HOMEPORT_SENTRY_DSN,
    });
  }
  loadInspinia();
  initAuthToken();
  store.dispatch(initConfig(ENV));
  LanguageUtilsService.checkLanguage();
  attachTransitions();
}
