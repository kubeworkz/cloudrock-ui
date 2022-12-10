import { SidebarMenuProps } from '@cloudrock/navigation/sidebar/types';
import { RootState } from '@cloudrock/store/reducers';

import { UPDATE_PROJECT_COUNTERS } from './actions';

export const getProjectCountersSelector = (state: RootState) =>
  state.sidebar.projectCounters;

export const projectCountersReducer = (
  state = { counters: null },
  action,
): Pick<SidebarMenuProps, 'counters'> => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROJECT_COUNTERS:
      return {
        ...state,
        counters: payload.counters,
      };

    default:
      return state;
  }
};
