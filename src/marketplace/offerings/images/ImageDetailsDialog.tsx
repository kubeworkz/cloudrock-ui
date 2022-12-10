import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { Image } from '@cloudrock/marketplace/types';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

interface ImageDetailsDialogProps {
  resolve: Image;
}

export const ImageDetailsDialog: FunctionComponent<ImageDetailsDialogProps> = (
  props,
) => (
  <ModalDialog
    title={translate('Viewing image')}
    footer={<CloseDialogButton />}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <img src={props.resolve.image} alt={translate('Image here')} />
      <span style={{ marginTop: '10px' }}>{props.resolve.description}</span>
    </div>
  </ModalDialog>
);
