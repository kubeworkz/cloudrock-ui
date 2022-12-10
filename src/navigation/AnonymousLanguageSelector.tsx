import { FunctionComponent } from 'react';

import { LanguageSelector } from '@cloudrock/i18n/LanguageSelector';
import './AnonymousLanguageSelector.scss';

export const AnonymousLanguageSelector: FunctionComponent = () => (
  <div className="anonymousLanguageSelector m-r">
    <i className="fa fa-globe" />
    <LanguageSelector />
  </div>
);
