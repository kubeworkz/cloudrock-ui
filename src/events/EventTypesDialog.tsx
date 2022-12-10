import { TranslateProps, withTranslation } from '@cloudrock/i18n';

import eventRegistry from './registry';
import { TypeListDialog } from './TypeListDialog';

const PureEventTypesDialog = ({ translate }: TranslateProps) => (
  <TypeListDialog
    types={eventRegistry.getGroups()}
    dialogTitle={translate('Event types')}
  />
);

export const EventTypesDialog = withTranslation(PureEventTypesDialog);
