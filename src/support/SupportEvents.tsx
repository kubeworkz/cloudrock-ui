import { getEventsList } from '@cloudrock/events/BaseEventsList';

export const SupportEvents = getEventsList({
  mapPropsToFilter: (props) => ({
    scope: props.resource.url,
  }),
});
