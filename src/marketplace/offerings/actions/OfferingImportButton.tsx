import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';

import { OfferingImportDialog } from './OfferingImportDialog';

export const OfferingImportButton: FunctionComponent = () => {
  const dispatch = useDispatch();
  return (
    <Button
      bsSize="sm"
      onClick={() =>
        dispatch(openModalDialog(OfferingImportDialog, { size: 'lg' }))
      }
    >
      <i className="fa fa-plus" /> {translate('Import offering')}
    </Button>
  );
};
