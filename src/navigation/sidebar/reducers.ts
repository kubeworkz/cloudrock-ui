import { combineReducers } from 'redux';

import { projectCountersReducer } from '@cloudrock/project/store';

export const reducer = combineReducers({
  projectCounters: projectCountersReducer,
});
