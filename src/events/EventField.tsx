import React, { FunctionComponent } from 'react';

import { Link } from '@cloudrock/core/Link';

interface EventFieldProps {
  label: string;
  value: React.ReactNode;
  state?: string;
  params?: {};
}

export const EventField: FunctionComponent<EventFieldProps> = (props) => {
  let value = props.value;
  if (!value) {
    return null;
  }
  if (props.state) {
    value = <Link state={props.state} params={props.params} label={value} />;
  }
  return (
    <tr>
      <td>{props.label}</td>
      <td>{value}</td>
    </tr>
  );
};
