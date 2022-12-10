import { FunctionComponent } from 'react';

import { TranslateProps } from '@cloudrock/i18n/types';
import { Button } from '@cloudrock/marketplace/offerings/service-providers/shared/Button';

interface GridRefreshButtonProps extends TranslateProps {
  fetch: () => void;
}

const RefreshIcon = require('./refresh.svg');

export const GridRefreshButton: FunctionComponent<GridRefreshButtonProps> = ({
  fetch,
}) => <Button label="Refresh" onClick={fetch} iconPrefix={RefreshIcon} />;
