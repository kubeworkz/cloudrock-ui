import React from 'react';

import './LocalLogin.css';

import { SigninForm } from './SigninForm';

interface LocalLoginProps {
  enableSeperator: boolean;
}

export const LocalLogin: React.FC<LocalLoginProps> = ({ enableSeperator }) => (
  <>
    <SigninForm />
    {enableSeperator && (
      <div className="LoginSeparator">
      </div>
    )}
  </>
);

LocalLogin.defaultProps = {
  enableSeperator: false,
};
