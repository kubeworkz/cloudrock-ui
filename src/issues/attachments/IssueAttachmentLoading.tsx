import { FunctionComponent } from 'react';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';

import './IssueAttachmentLoading.scss';

export const IssueAttachmentLoading: FunctionComponent = () => {
  return (
    <div className="attachment-item-loading">
      <div className="attachment-item__overlay">
        <LoadingSpinner />
      </div>
    </div>
  );
};
