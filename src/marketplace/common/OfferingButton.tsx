import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';

import { Tooltip } from '@cloudrock/core/Tooltip';

import './OfferingButton.scss';

interface OfferingButtonProps {
  icon: string;
  title: string;
  onClick?(): void;
  isActive?: boolean;
  flavor?: 'primary' | 'secondary' | 'ternary';
  disabled?: boolean;
  isAddingItem?: boolean;
}

export const OfferingButton: FunctionComponent<OfferingButtonProps> = (
  props,
) => {
  if (props.flavor === 'primary') {
    return (
      <Button
        bsSize="sm"
        bsStyle="primary"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.isAddingItem && <i className="fa fa-spinner fa-spin m-r-xs" />}
        <i className={props.icon} /> {props.title}
      </Button>
    );
  } else if (props.flavor === 'secondary') {
    return (
      <Tooltip
        label={props.title}
        id="offering-button"
        className={classNames('btn btn-sm btn-default', {
          disabled: props.disabled,
        })}
        onClick={props.onClick}
      >
        <i className={props.icon} />
      </Tooltip>
    );
  }
  return (
    <Tooltip
      label={props.title}
      id="offering-button"
      className={classNames('offering-button', {
        'offering-button-active': props.isActive,
      })}
      onClick={props.onClick}
    >
      <i className={props.icon} />
    </Tooltip>
  );
};

OfferingButton.defaultProps = {
  flavor: 'ternary',
};
