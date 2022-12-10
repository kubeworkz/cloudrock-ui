import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { Image } from '@cloudrock/marketplace/types';

interface ImageThumbnailProps {
  image: Image;
  onClick(): void;
}

export const ImageThumbnail: FunctionComponent<ImageThumbnailProps> = (
  props,
) => {
  return (
    <img
      src={props.image.thumbnail}
      alt={translate('Image here')}
      onClick={props.onClick}
      style={{ cursor: 'pointer' }}
    />
  );
};
