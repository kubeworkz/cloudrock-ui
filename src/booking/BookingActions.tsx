import { useBoolean } from 'react-use';

import { ResourceActionComponent } from '@cloudrock/resource/actions/ResourceActionComponent';

import { AcceptAction } from './AcceptAction';
import { CancelAction } from './CancelAction';

const ActionsList = [AcceptAction, CancelAction];

export const BookingActions = ({ resource, reInitResource }) => {
  const [open, onToggle] = useBoolean(false);

  return (
    <ResourceActionComponent
      open={open}
      onToggle={onToggle}
      actions={ActionsList}
      resource={resource}
      reInitResource={reInitResource}
    />
  );
};
