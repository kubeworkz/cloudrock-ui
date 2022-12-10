import React from 'react';

import { withTranslation, TranslateProps } from '@cloudrock/i18n';

interface AddOptionButtonProps extends TranslateProps {
  onClick(): void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const AddOptionButton = withTranslation(
  (props: AddOptionButtonProps) => (
    <button
      type="button"
      className="btn btn-default"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <i className="fa fa-plus" /> {props.children}
    </button>
  ),
);
