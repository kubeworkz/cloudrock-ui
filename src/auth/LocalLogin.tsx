import React from 'react';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';

import './LocalLogin.css';

import { SigninForm } from './SigninForm';

interface LocalLoginProps {
  enableSeperator: boolean;
}

const Border = () => (
  <div
    className="LoginSeparatorBorder"
    style={{
      borderBottomColor: ENV.plugins.CLOUDROCK_CORE.BRAND_COLOR,
    }}
  />
);

export const LocalLogin: React.FC<LocalLoginProps> = ({ enableSeperator }) => (
  <>
    <SigninForm />
    {enableSeperator && (
      <div className="LoginSeparator">
        <Border />
        <div className="LoginSeparatorText">{translate('OR')}</div>
        <Border />
      </div>
    )}
  </>
);

LocalLogin.defaultProps = {
  enableSeperator: false,
};
