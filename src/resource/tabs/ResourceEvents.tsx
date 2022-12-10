import { getEventsList } from '@cloudrock/events/BaseEventsList';

export const ResourceEvents = getEventsList({
  mapPropsToFilter: (props) => ({
    scope: props.resource.url,
  }),
  mapPropsToTableId: (props) => [props.resource?.uuid],
});
